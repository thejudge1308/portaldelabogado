#!/bin/bash
# debug-404.sh - Script para diagnosticar problema 404

echo "🔍 DIAGNÓSTICO DEL PROBLEMA 404"
echo "================================"

cd /Users/patricioquezadalaras/Documents/Trabajos/portaldeabogados

echo ""
echo "1️⃣ Verificando si la API funciona..."
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo "✅ API funciona - El container está corriendo"
    curl http://localhost:8080/api/health
else
    echo "❌ API no funciona - Problema con el container"
    echo "   Ejecuta: docker-compose up --build -d"
    exit 1
fi

echo ""
echo "2️⃣ Verificando logs del container..."
echo "📋 Últimos logs:"
docker-compose logs --tail=20 portal-abogados-spa

echo ""
echo "3️⃣ Verificando archivos dentro del container..."
echo "📁 Archivos en el container:"
docker-compose exec portal-abogados-spa ls -la portaldelabogado/ || echo "❌ No se puede acceder a portaldelabogado/"

echo ""
echo "4️⃣ Probando build local de Angular..."
cd Web
if ng build --configuration docker-prod; then
    echo "✅ Build de Angular exitoso"
    echo "📁 Archivos generados:"
    ls -la dist/
else
    echo "❌ Error en build de Angular"
    exit 1
fi
cd ..

echo ""
echo "5️⃣ SOLUCIONES RÁPIDAS:"
echo "========================"
echo ""
echo "🎯 SOLUCIÓN A: Usar Dockerfile simple"
echo "docker build -f Dockerfile.simple -t portal-simple ."
echo "docker run -p 8080:8080 portal-simple"
echo ""
echo "🎯 SOLUCIÓN B: Debug detallado"
echo "docker-compose -f docker-compose.debug.yml up --build"
echo ""
echo "🎯 SOLUCIÓN C: Rebuild completo"
echo "docker-compose down --volumes --remove-orphans"
echo "docker-compose up --build -d"
echo ""
echo "🎯 SOLUCIÓN D: Inspeccionar container"
echo "docker-compose exec portal-abogados-spa sh"
echo "# Dentro: ls -la portaldelabogado/"
