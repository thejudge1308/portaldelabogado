#!/bin/bash
# deploy-docker-portaldelabogado.sh - Deployment Docker para DigitalOcean
# Deployment súper simple con Docker

set -e

echo "🐳 Deployment Docker - Portal del Abogado"
echo "========================================"
echo "🌐 Dominio: portaldelabogado.com"
echo "🌊 Platform: DigitalOcean Ubuntu + Docker"
echo ""

# Variables
DOMAIN="portaldelabogado.com"
REPO_URL="https://github.com/TU_USUARIO/portaldeabogados.git"  # CAMBIAR por tu repo
APP_DIR="/home/deploy/portaldeabogados"
DROPLET_IP="TU_DROPLET_IP"  # CAMBIAR por tu IP

echo "📋 PASOS PARA DEPLOYMENT DOCKER:"
echo "================================"

echo ""
echo "🟢 PASO 1: Crear Droplet DigitalOcean"
echo "======================================"
cat << 'EOF'
En el panel de DigitalOcean:
1. Create → Droplets
2. Choose Image → Marketplace → Docker on Ubuntu 22.04
3. Choose Plan → Basic → $12/mo (2GB RAM, 1 vCPU, 50GB SSD)
4. Choose Region → La más cercana a tus usuarios
5. Authentication → SSH Key (recomendado)
6. Finalize → Hostname: portal-del-abogado
7. Create Droplet

RESULTADO: Tendrás Docker pre-instalado ✅
EOF

echo ""
echo "🌐 PASO 2: Configurar DNS"
echo "========================="
cat << EOF
En el panel de DigitalOcean:
1. Networking → Domains → Add Domain
2. Domain: $DOMAIN
3. Add to project

Crear registros:
- A record: @ → $DROPLET_IP
- A record: www → $DROPLET_IP
- CAA record: @ → 0 issue "letsencrypt.org"

O usar tu proveedor de DNS actual:
$DOMAIN        A    $DROPLET_IP
www.$DOMAIN    A    $DROPLET_IP
EOF

echo ""
echo "🔑 PASO 3: Conectar al Droplet"
echo "==============================="
cat << EOF
# Conectar via SSH
ssh root@$DROPLET_IP

# Verificar Docker
docker --version
docker-compose --version

# Si no están instalados:
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
EOF

echo ""
echo "👤 PASO 4: Crear Usuario Deploy"
echo "================================"
cat << 'EOF'
# Crear usuario no-root
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy

# Cambiar a usuario deploy
su - deploy
EOF

echo ""
echo "📦 PASO 5: Clonar Proyecto"
echo "=========================="
cat << EOF
# Clonar tu repositorio
git clone $REPO_URL
cd portaldeabogados

# Verificar archivos Docker
ls -la Dockerfile.yml docker-compose.yml .env.production
EOF

echo ""
echo "⚙️ PASO 6: Configurar Environment"
echo "=================================="
cat << 'EOF'
# Copiar configuración de producción
cp .env.production .env

# Editar configuración
nano .env

# CAMBIAR ESTOS VALORES:
POSTGRES_PASSWORD=tu_password_super_seguro_aqui
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)
SMTP_USER=tu_email_sendgrid
SMTP_PASSWORD=tu_api_key_sendgrid
EOF

echo ""
echo "🚀 PASO 7: DEPLOY CON DOCKER (¡UN SOLO COMANDO!)"
echo "=================================================="
cat << 'EOF'
# 🎯 COMANDO MÁGICO - Build y ejecutar TODO:
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Verificar que funciona
curl http://localhost:8080/api/health

# Ver estado de containers
docker-compose ps
EOF

echo ""
echo "🌐 PASO 8: Configurar Nginx + SSL"
echo "=================================="
cat << EOF
# Instalar Nginx
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Crear configuración Nginx
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<'NGINXEOF'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
    }
}
NGINXEOF

# Activar sitio
sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 🔒 SSL AUTOMÁTICO con Let's Encrypt
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN
EOF

echo ""
echo "🛡️ PASO 9: Configurar Firewall"
echo "==============================="
cat << 'EOF'
# UFW local
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# En panel DigitalOcean:
# Networking → Firewalls → Create Firewall
# Inbound Rules:
# - SSH (22) - Your IP only
# - HTTP (80) - All IPv4, All IPv6  
# - HTTPS (443) - All IPv4, All IPv6
# Apply to: portal-del-abogado
EOF

echo ""
echo "✅ PASO 10: Verificar Deployment"
echo "================================="
cat << EOF
# Verificar aplicación
curl https://$DOMAIN/api/health
curl https://$DOMAIN/api/specialties

# Verificar SSL
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN

# Ver logs Docker
docker-compose logs -f portal-abogados-spa

# En navegador
echo "🌐 Abrir: https://$DOMAIN"
EOF

echo ""
echo "🔄 COMANDOS ÚTILES POST-DEPLOYMENT"
echo "=================================="
cat << 'EOF'
# Ver estado
docker-compose ps

# Ver logs
docker-compose logs -f

# Actualizar aplicación
git pull origin main
docker-compose up --build -d

# Reiniciar servicios
docker-compose restart

# Entrar al container
docker-compose exec portal-abogados-spa sh

# Backup volumes
docker run --rm -v portaldeabogados_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .

# Ver uso de recursos
docker stats
EOF

echo ""
echo "⚡ VENTAJAS DE USAR DOCKER"
echo "=========================="
cat << 'EOF'
✅ Setup en 10 minutos vs 1 hora manual
✅ Un solo comando para deploy
✅ Rollback instantáneo
✅ Escalabilidad fácil
✅ Aislamiento completo
✅ Portabilidad total
✅ Updates sin downtime
✅ Backup de volumes automático
EOF

echo ""
echo "🎯 URLs FINALES"
echo "==============="
cat << EOF
🌐 Sitio web: https://$DOMAIN
🌐 Con WWW: https://www.$DOMAIN
🔌 API Health: https://$DOMAIN/api/health
📊 API Endpoints: https://$DOMAIN/api/*
🐳 Docker status: docker-compose ps
EOF

echo ""
echo "💰 COSTOS DIGITALOCEAN"
echo "====================="
cat << 'EOF'
💧 Droplet 2GB: $12/mes
🌐 DNS hosting: Gratis
🔒 SSL Let's Encrypt: Gratis
📊 Monitoring: Gratis
🛡️ Firewall: Gratis
===============================
💰 Total: ~$12/mes + dominio
EOF

echo ""
echo "🆘 TROUBLESHOOTING"
echo "=================="
cat << 'EOF'
❌ "Container no inicia":
   → docker-compose logs portal-abogados-spa
   → Verificar .env configurado correctamente

❌ "502 Bad Gateway":
   → curl http://localhost:8080/api/health
   → docker-compose ps

❌ "SSL no funciona":
   → sudo certbot certificates
   → sudo nginx -t

❌ "DNS no resuelve":
   → dig portaldelabogado.com
   → Esperar propagación (hasta 48h)
EOF

echo ""
echo "🎉 ¡DEPLOYMENT DOCKER COMPLETADO!"
echo "=================================="
echo "Tu Portal del Abogado estará en: https://$DOMAIN"
echo ""
echo "Para updates futuros:"
echo "cd /home/deploy/portaldeabogados"
echo "git pull && docker-compose up --build -d"
echo ""
echo "¡Docker hace todo súper simple! 🐳⚖️"
