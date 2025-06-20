#!/bin/bash

# ====================
# Script de Despliegue para Portal de Abogados
# Automatiza el proceso completo de despliegue en VPS
# ====================

set -e  # Salir si hay algún error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
PROJECT_NAME="portal-abogados"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.production"

echo -e "${BLUE}🚀 Portal de Abogados - Script de Despliegue${NC}"
echo "=================================================="

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado. Por favor instala Docker primero.${NC}"
    exit 1
fi

# Verificar que Docker Compose está disponible
if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose no está instalado. Por favor instala Docker Compose primero.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker y Docker Compose están disponibles${NC}"

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIÓN]"
    echo ""
    echo "Opciones:"
    echo "  build         Construir las imágenes Docker"
    echo "  deploy        Desplegar la aplicación completa"
    echo "  start         Iniciar los servicios"
    echo "  stop          Detener los servicios"
    echo "  restart       Reiniciar los servicios"
    echo "  logs          Ver logs de los servicios"
    echo "  status        Ver estado de los servicios"
    echo "  cleanup       Limpiar imágenes y contenedores no utilizados"
    echo "  ssl           Configurar SSL con Traefik"
    echo "  backup        Hacer backup de la base de datos"
    echo "  restore       Restaurar backup de la base de datos"
    echo "  help          Mostrar esta ayuda"
    echo ""
    echo "Perfiles disponibles:"
    echo "  --with-nginx      Incluir Nginx reverse proxy"
    echo "  --with-database   Incluir PostgreSQL"
    echo "  --with-cache      Incluir Redis"
    echo "  --with-traefik    Incluir Traefik con SSL automático"
}

# Función para build
build_images() {
    echo -e "${YELLOW}🔨 Construyendo imágenes Docker...${NC}"
    
    # Limpiar builds anteriores
    docker compose -f $COMPOSE_FILE build --no-cache portal-app
    
    echo -e "${GREEN}✅ Imágenes construidas exitosamente${NC}"
}

# Función para deploy completo
deploy() {
    echo -e "${YELLOW}🚀 Iniciando despliegue completo...${NC}"
    
    # Verificar que existe el archivo de environment
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${YELLOW}⚠️  Archivo $ENV_FILE no encontrado. Creando desde template...${NC}"
        cp .env.production.example $ENV_FILE 2>/dev/null || echo "# Configurar variables de entorno" > $ENV_FILE
        echo -e "${YELLOW}📝 Por favor edita $ENV_FILE con tu configuración antes de continuar${NC}"
        read -p "Presiona Enter cuando hayas configurado las variables de entorno..."
    fi
    
    # Build de las imágenes
    build_images
    
    # Obtener perfiles a usar
    PROFILES=""
    if [[ "$@" == *"--with-nginx"* ]]; then
        PROFILES="$PROFILES nginx"
    fi
    if [[ "$@" == *"--with-database"* ]]; then
        PROFILES="$PROFILES database"
    fi
    if [[ "$@" == *"--with-cache"* ]]; then
        PROFILES="$PROFILES cache"
    fi
    if [[ "$@" == *"--with-traefik"* ]]; then
        PROFILES="$PROFILES traefik"
    fi
    
    # Construir comando de docker compose
    COMPOSE_CMD="docker compose -f $COMPOSE_FILE"
    if [ ! -z "$PROFILES" ]; then
        for profile in $PROFILES; do
            COMPOSE_CMD="$COMPOSE_CMD --profile $profile"
        done
    fi
    
    # Levantar servicios
    echo -e "${YELLOW}🚀 Levantando servicios...${NC}"
    $COMPOSE_CMD up -d
    
    # Esperar que los servicios estén listos
    echo -e "${YELLOW}⏳ Esperando que los servicios estén listos...${NC}"
    sleep 10
    
    # Verificar salud de los servicios
    check_health
    
    echo -e "${GREEN}🎉 ¡Despliegue completado exitosamente!${NC}"
    echo -e "${BLUE}📱 La aplicación está disponible en:${NC}"
    echo -e "   ${GREEN}http://localhost:8080${NC} (aplicación directa)"
    if [[ "$PROFILES" == *"nginx"* ]]; then
        echo -e "   ${GREEN}http://localhost${NC} (a través de Nginx)"
    fi
    if [[ "$PROFILES" == *"traefik"* ]]; then
        echo -e "   ${GREEN}http://localhost:8090${NC} (dashboard de Traefik)"
    fi
}

# Función para verificar salud
check_health() {
    echo -e "${YELLOW}🔍 Verificando salud de los servicios...${NC}"
    
    # Verificar aplicación principal
    for i in {1..30}; do
        if curl -f -s http://localhost:8080/api/health > /dev/null; then
            echo -e "${GREEN}✅ Aplicación principal: OK${NC}"
            break
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}❌ Aplicación principal: TIMEOUT${NC}"
            return 1
        fi
        sleep 2
    done
}

# Función para ver logs
show_logs() {
    echo -e "${YELLOW}📋 Mostrando logs de los servicios...${NC}"
    docker compose -f $COMPOSE_FILE logs -f --tail=50
}

# Función para limpiar
cleanup() {
    echo -e "${YELLOW}🧹 Limpiando recursos Docker no utilizados...${NC}"
    docker system prune -af
    docker volume prune -f
    echo -e "${GREEN}✅ Limpieza completada${NC}"
}

# Función para backup
backup_db() {
    echo -e "${YELLOW}💾 Creando backup de la base de datos...${NC}"
    BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
    docker compose -f $COMPOSE_FILE exec postgres pg_dump -U portal_user portaldeabogados > $BACKUP_FILE
    echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE${NC}"
}

# Función para restaurar backup
restore_db() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ Especifica el archivo de backup: $0 restore backup_file.sql${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}🔄 Restaurando backup: $1${NC}"
    docker compose -f $COMPOSE_FILE exec -T postgres psql -U portal_user portaldeabogados < $1
    echo -e "${GREEN}✅ Backup restaurado exitosamente${NC}"
}

# Main script logic
case "$1" in
    build)
        build_images
        ;;
    deploy)
        shift
        deploy "$@"
        ;;
    start)
        echo -e "${YELLOW}▶️  Iniciando servicios...${NC}"
        docker compose -f $COMPOSE_FILE start
        ;;
    stop)
        echo -e "${YELLOW}⏹️  Deteniendo servicios...${NC}"
        docker compose -f $COMPOSE_FILE stop
        ;;
    restart)
        echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"
        docker compose -f $COMPOSE_FILE restart
        ;;
    logs)
        show_logs
        ;;
    status)
        echo -e "${YELLOW}📊 Estado de los servicios:${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    cleanup)
        cleanup
        ;;
    ssl)
        echo -e "${YELLOW}🔒 Configurando SSL con Traefik...${NC}"
        docker compose -f $COMPOSE_FILE --profile traefik up -d traefik
        ;;
    backup)
        backup_db
        ;;
    restore)
        restore_db "$2"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Opción no válida: $1${NC}"
        show_help
        exit 1
        ;;
esac
