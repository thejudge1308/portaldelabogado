#!/bin/bash

# ====================
# Script de Verificación Pre-Despliegue
# Verifica que todo esté listo antes del despliegue
# ====================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Portal de Abogados - Verificación Pre-Despliegue${NC}"
echo "======================================================="

ERRORS=0

# Función para reportar error
report_error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

# Función para reportar éxito
report_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para reportar advertencia
report_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar Docker
echo -e "\n${YELLOW}🐳 Verificando Docker...${NC}"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
    report_success "Docker $DOCKER_VERSION instalado"
    
    # Verificar que Docker está corriendo
    if docker ps &> /dev/null; then
        report_success "Docker daemon está corriendo"
    else
        report_error "Docker daemon no está corriendo"
    fi
else
    report_error "Docker no está instalado"
fi

# Verificar Docker Compose
echo -e "\n${YELLOW}🛠️  Verificando Docker Compose...${NC}"
if command -v docker compose &> /dev/null; then
    COMPOSE_VERSION=$(docker compose --version | cut -d' ' -f3 | cut -d',' -f1)
    report_success "Docker Compose $COMPOSE_VERSION instalado"
elif docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version --short)
    report_success "Docker Compose Plugin $COMPOSE_VERSION instalado"
else
    report_error "Docker Compose no está instalado"
fi

# Verificar estructura del proyecto
echo -e "\n${YELLOW}📁 Verificando estructura del proyecto...${NC}"

# Verificar archivos esenciales
REQUIRED_FILES=(
    "Dockerfile"
    "docker compose.yml"
    "Web/package.json"
    "Web/angular.json"
    "Api/go.mod"
    "Api/main.go"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        report_success "Archivo $file existe"
    else
        report_error "Archivo $file no encontrado"
    fi
done

# Verificar proyecto Angular
echo -e "\n${YELLOW}📱 Verificando proyecto Angular...${NC}"
if [ -f "Web/package.json" ]; then
    cd Web
    
    # Verificar que node_modules existe
    if [ -d "node_modules" ]; then
        report_success "Dependencias de Angular instaladas"
    else
        report_warning "Dependencias de Angular no instaladas. Ejecuta: cd Web && npm install"
    fi
    
    # Verificar script build:prod
    if grep -q "build:prod" package.json; then
        report_success "Script build:prod configurado"
    else
        report_error "Script build:prod no encontrado en package.json"
    fi
    
    cd ..
fi

# Verificar proyecto Go
echo -e "\n${YELLOW}🔧 Verificando proyecto Go...${NC}"
if [ -f "Api/go.mod" ]; then
    cd Api
    
    # Verificar que go.sum existe (dependencias descargadas)
    if [ -f "go.sum" ]; then
        report_success "Dependencias de Go descargadas"
    else
        report_warning "Dependencias de Go no descargadas. Ejecuta: cd Api && go mod tidy"
    fi
    
    cd ..
fi

# Verificar configuración de build de Angular
echo -e "\n${YELLOW}🏗️  Verificando configuración de build...${NC}"
if [ -f "Web/angular.json" ]; then
    if grep -q "../Api/wwwroot" Web/angular.json; then
        report_success "Output path configurado correctamente para producción"
    else
        report_error "Output path no configurado para ../Api/wwwroot"
    fi
fi

# Verificar variables de entorno
echo -e "\n${YELLOW}🔐 Verificando configuración de entorno...${NC}"
if [ -f ".env.production" ]; then
    report_success "Archivo .env.production existe"
    
    # Verificar variables críticas
    if grep -q "PORT=" .env.production; then
        report_success "Variable PORT configurada"
    else
        report_warning "Variable PORT no configurada en .env.production"
    fi
else
    report_warning "Archivo .env.production no existe. Se usará configuración por defecto"
fi

# Verificar permisos
echo -e "\n${YELLOW}🔑 Verificando permisos...${NC}"
if [ -f "deploy.sh" ]; then
    if [ -x "deploy.sh" ]; then
        report_success "Script deploy.sh es ejecutable"
    else
        report_warning "Script deploy.sh no es ejecutable. Ejecuta: chmod +x deploy.sh"
    fi
else
    report_error "Script deploy.sh no encontrado"
fi

# Verificar espacio en disco
echo -e "\n${YELLOW}💾 Verificando recursos del sistema...${NC}"
AVAILABLE_SPACE=$(df . | tail -1 | awk '{print $4}')
if [ "$AVAILABLE_SPACE" -gt 1000000 ]; then  # 1GB en KB
    report_success "Suficiente espacio en disco disponible"
else
    report_warning "Poco espacio en disco disponible ($(($AVAILABLE_SPACE/1024))MB)"
fi

# Verificar memoria
if command -v free &> /dev/null; then
    AVAILABLE_MEMORY=$(free -m | awk 'NR==2{print $7}')
    if [ "$AVAILABLE_MEMORY" -gt 512 ]; then
        report_success "Suficiente memoria disponible (${AVAILABLE_MEMORY}MB)"
    else
        report_warning "Poca memoria disponible (${AVAILABLE_MEMORY}MB)"
    fi
fi

# Verificar puertos
echo -e "\n${YELLOW}🌐 Verificando puertos...${NC}"
PORTS_TO_CHECK=(8080 80 443)

for port in "${PORTS_TO_CHECK[@]}"; do
    if command -v netstat &> /dev/null; then
        if netstat -tuln | grep -q ":$port "; then
            report_warning "Puerto $port está en uso"
        else
            report_success "Puerto $port está disponible"
        fi
    elif command -v ss &> /dev/null; then
        if ss -tuln | grep -q ":$port "; then
            report_warning "Puerto $port está en uso"
        else
            report_success "Puerto $port está disponible"
        fi
    fi
done

# Resumen final
echo -e "\n${BLUE}📊 Resumen de Verificación${NC}"
echo "=========================="

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Todo listo para el despliegue!${NC}"
    echo ""
    echo "Comandos sugeridos:"
    echo "  ./deploy.sh deploy              # Despliegue básico"
    echo "  ./deploy.sh deploy --with-nginx # Con reverse proxy"
    echo "  ./deploy.sh deploy --with-traefik # Con SSL automático"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Se encontraron $ERRORS errores que deben corregirse antes del despliegue${NC}"
    echo ""
    echo "Por favor revisa los errores reportados arriba y corrígelos."
    echo ""
    exit 1
fi
