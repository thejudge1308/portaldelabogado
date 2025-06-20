#!/bin/bash

# Script de desarrollo para Portal de Abogados API

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Portal de Abogados - Servidor de Desarrollo${NC}"
echo "================================================"

# Verificar que Go está instalado
if ! command -v go &> /dev/null; then
    echo -e "${RED}❌ Go no está instalado. Por favor instala Go 1.21 o superior.${NC}"
    exit 1
fi

# Verificar versión de Go
GO_VERSION=$(go version | awk '{print $3}' | cut -c 3-)
echo -e "${YELLOW}📦 Versión de Go: $GO_VERSION${NC}"

# Verificar que wwwroot existe
if [ ! -d "wwwroot" ]; then
    echo -e "${RED}❌ Carpeta wwwroot no encontrada. Asegúrate de que los archivos de Angular estén compilados.${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Archivos de Angular encontrados en wwwroot/${NC}"

# Instalar dependencias
echo -e "${YELLOW}📥 Instalando dependencias...${NC}"
go mod tidy

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"

# Variables de entorno para desarrollo
export PORT=8080
export GIN_MODE=debug

echo -e "${YELLOW}🔧 Configuración:${NC}"
echo "   Puerto: $PORT"
echo "   Modo: desarrollo"
echo "   URL: http://localhost:$PORT"

echo -e "${GREEN}🚀 Iniciando servidor de desarrollo...${NC}"
echo "   Presiona Ctrl+C para detener el servidor"
echo ""

# Ejecutar el servidor con recarga automática si air está disponible
if command -v air &> /dev/null; then
    echo -e "${YELLOW}🔄 Usando Air para recarga automática${NC}"
    air
else
    echo -e "${YELLOW}💡 Tip: Instala 'air' para recarga automática: go install github.com/cosmtrek/air@latest${NC}"
    go run main.go
fi
