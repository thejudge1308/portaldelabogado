#!/bin/bash
# Comandos específicos para deployment de portaldelabogado.com
# Ejecutar estos comandos paso a paso en tu VPS

set -e

echo "🚀 Deployment de Portal del Abogado - portaldelabogado.com"
echo "=============================================="

# Variables
DOMAIN="portaldelabogado.com"
PROJECT_DIR="/opt/portaldelabogado"
SERVICE_NAME="portaldelabogado"

echo "🔧 PASO 1: Configuración inicial del servidor"
echo "=============================================="
cat << 'EOF'
# Conectar a tu VPS
ssh root@TU_IP_VPS

# Crear usuario deploy
adduser deploy
usermod -aG sudo deploy
su - deploy

# Actualizar sistema
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx certbot python3-certbot-nginx curl wget
EOF

echo ""
echo "🟢 PASO 2: Instalar Node.js y Golang"
echo "=============================================="
cat << 'EOF'
# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar Node.js
node --version
npm --version

# Instalar Golang
wget https://golang.org/dl/go1.21.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc

# Verificar Golang
go version
EOF

echo ""
echo "📁 PASO 3: Clonar y configurar proyecto"
echo "=============================================="
cat << EOF
# Crear directorio del proyecto
cd /opt
sudo mkdir ${PROJECT_DIR##*/}
sudo chown deploy:deploy ${PROJECT_DIR##*/}

# Clonar repositorio (CAMBIAR URL por tu repositorio)
git clone https://github.com/TU_USUARIO/portaldeabogados.git ${PROJECT_DIR##*/}
cd $PROJECT_DIR

# Configurar variables de entorno
cp .env.production .env
nano .env
# EDITAR: Cambiar passwords, JWT secrets, email config, etc.
EOF

echo ""
echo "🔨 PASO 4: Build de la aplicación"
echo "=============================================="
cat << EOF
cd $PROJECT_DIR

# Build Angular para SPA
cd Web
npm ci
ng build --configuration spa-prod

# Verificar que los archivos se generaron
ls -la ../Api/portaldelabogado/

# Build Golang
cd ../Api
go mod tidy
go build -o portal-${DOMAIN%.*}-spa main.go

# Verificar ejecutable
ls -la portal-${DOMAIN%.*}-spa
./portal-${DOMAIN%.*}-spa &
sleep 2
curl http://localhost:8080/api/health
killall portal-${DOMAIN%.*}-spa
EOF

echo ""
echo "⚙️ PASO 5: Configurar servicio systemd"
echo "=============================================="
cat << EOF
# Crear archivo de servicio
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOL
[Unit]
Description=Portal del Abogado SPA
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=$PROJECT_DIR/Api
ExecStart=$PROJECT_DIR/Api/portal-${DOMAIN%.*}-spa
Restart=always
RestartSec=5
EnvironmentFile=$PROJECT_DIR/.env

[Install]
WantedBy=multi-user.target
EOL

# Habilitar y iniciar servicio
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME

# Verificar estado
sudo systemctl status $SERVICE_NAME
curl http://localhost:8080/api/health
EOF

echo ""
echo "🌐 PASO 6: Configurar Nginx (sin SSL primero)"
echo "=============================================="
cat << EOF
# Crear configuración básica de Nginx
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<EOL
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
    }
}
EOL

# Activar sitio
sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar que funciona
curl -H "Host: $DOMAIN" http://localhost/api/health
EOF

echo ""
echo "🔒 PASO 7: Configurar SSL con Let's Encrypt"
echo "=============================================="
cat << EOF
# IMPORTANTE: Asegúrate de que tu DNS esté configurado primero:
# $DOMAIN -> TU_IP_VPS
# www.$DOMAIN -> TU_IP_VPS

# Verificar DNS
dig $DOMAIN A
dig www.$DOMAIN A

# Obtener certificado SSL
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN

# Verificar certificado
sudo certbot certificates

# Test de renovación automática
sudo certbot renew --dry-run

# Verificar HTTPS
curl https://$DOMAIN/api/health
EOF

echo ""
echo "🛡️ PASO 8: Configurar firewall"
echo "=============================================="
cat << 'EOF'
# Configurar UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Verificar estado
sudo ufw status verbose
EOF

echo ""
echo "✅ PASO 9: Verificaciones finales"
echo "=============================================="
cat << EOF
# Verificar que todo funciona
curl https://$DOMAIN/api/health
curl https://$DOMAIN/api/specialties
curl https://$DOMAIN/api/locations

# Verificar en navegador
echo "🌐 Abrir en navegador: https://$DOMAIN"

# Verificar logs
sudo journalctl -u $SERVICE_NAME -f

# Verificar SSL
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN
EOF

echo ""
echo "🔄 SCRIPT DE ACTUALIZACIÓN FUTURO"
echo "=============================================="
cat << EOF
# Crear script de actualización
tee ~/update-$DOMAIN.sh > /dev/null <<EOL
#!/bin/bash
set -e
cd $PROJECT_DIR
sudo systemctl stop $SERVICE_NAME
git pull origin main
cd Web && npm ci && ng build --configuration spa-prod
cd ../Api && go build -o portal-${DOMAIN%.*}-spa main.go
sudo systemctl start $SERVICE_NAME
sleep 3
curl -f https://$DOMAIN/api/health
echo "✅ Actualización completada"
EOL

chmod +x ~/update-$DOMAIN.sh
EOF

echo ""
echo "🎉 ¡DEPLOYMENT COMPLETO!"
echo "=============================================="
echo "Tu Portal del Abogado estará disponible en:"
echo "🌐 https://$DOMAIN"
echo "🌐 https://www.$DOMAIN"
echo "🔌 API: https://$DOMAIN/api/health"
echo ""
echo "Para futuras actualizaciones:"
echo "ssh deploy@TU_IP_VPS"
echo "~/update-$DOMAIN.sh"
