# 🚀 Portal de Abogados - Guía de Despliegue en VPS

Esta guía te ayudará a desplegar Portal de Abogados en una VPS usando Docker y Docker Compose.

## 📋 Prerrequisitos

### En tu VPS:

- Ubuntu 20.04+ / CentOS 8+ / Debian 10+
- Mínimo 2GB RAM, 20GB disco
- Docker 20.10+
- Docker Compose 2.0+
- Acceso SSH con privilegios sudo
- Dominio apuntando a tu VPS (opcional, para SSL)

### Instalación de Docker en Ubuntu:

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Agregar clave GPG de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Agregar repositorio
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión o ejecutar:
newgrp docker
```

## 📁 Estructura del Proyecto

```
portaldeabogados/
├── Dockerfile                 # 🐳 Imagen multi-stage
├── docker-compose.yml        # 🛠️ Orquestación de servicios
├── deploy.sh                 # 🚀 Script de despliegue automatizado
├── nginx.conf                # ⚙️ Configuración de Nginx
├── .env.production           # 🔐 Variables de entorno
├── .dockerignore             # 📄 Archivos a ignorar en build
├── Web/                      # 📱 Aplicación Angular
└── Api/                      # 🔧 Servidor Go
```

## 🚀 Despliegue Rápido

### 1. Clonar y preparar el proyecto:

```bash
# En tu VPS
git clone <tu-repo> portal-abogados
cd portal-abogados

# Hacer ejecutable el script de despliegue
chmod +x deploy.sh
```

### 2. Configurar variables de entorno:

```bash
# Copiar template de configuración
cp .env.production .env

# Editar configuración (ajustar según tu entorno)
nano .env
```

### 3. Desplegar aplicación básica:

```bash
# Despliegue simple (solo la aplicación)
./deploy.sh deploy

# Despliegue con Nginx reverse proxy
./deploy.sh deploy --with-nginx

# Despliegue completo con base de datos y cache
./deploy.sh deploy --with-database --with-cache

# Despliegue con SSL automático usando Traefik
./deploy.sh deploy --with-traefik
```

## 🌐 Opciones de Despliegue

### Opción 1: Aplicación Simple

```bash
./deploy.sh deploy
```

- ✅ Solo la aplicación Portal de Abogados
- ✅ Puerto 8080 expuesto directamente
- ✅ Ideal para desarrollo o entornos simples

### Opción 2: Con Nginx Reverse Proxy

```bash
./deploy.sh deploy --with-nginx
```

- ✅ Nginx como reverse proxy
- ✅ Compresión gzip
- ✅ Cache de archivos estáticos
- ✅ Headers de seguridad
- ✅ Rate limiting

### Opción 3: Con Base de Datos

```bash
./deploy.sh deploy --with-database
```

- ✅ PostgreSQL 15
- ✅ Volumen persistente para datos
- ✅ Usuario y base de datos configurados

### Opción 4: Completo con SSL Automático

```bash
./deploy.sh deploy --with-traefik
```

- ✅ Traefik reverse proxy
- ✅ SSL automático con Let's Encrypt
- ✅ Dashboard de monitoreo
- ✅ Renovación automática de certificados

## ⚙️ Configuración de Variables de Entorno

Edita el archivo `.env` con tu configuración:

```bash
# Configuración básica
PORT=8080
GIN_MODE=release

# Base de datos (si usas --with-database)
DB_HOST=postgres
DB_PORT=5432
DB_NAME=portaldeabogados
DB_USER=portal_user
DB_PASSWORD=tu_password_muy_seguro

# SSL/TLS (si usas --with-traefik)
DOMAIN=portaldelabogado.com
EMAIL=tu-email@ejemplo.com

# Seguridad
JWT_SECRET=tu_jwt_secret_muy_muy_seguro_de_al_menos_32_caracteres
```

## 🔧 Comandos de Gestión

### Gestión de servicios:

```bash
# Ver estado de servicios
./deploy.sh status

# Ver logs en tiempo real
./deploy.sh logs

# Reiniciar servicios
./deploy.sh restart

# Detener servicios
./deploy.sh stop

# Iniciar servicios
./deploy.sh start
```

### Mantenimiento:

```bash
# Limpiar imágenes no utilizadas
./deploy.sh cleanup

# Hacer backup de base de datos
./deploy.sh backup

# Restaurar backup
./deploy.sh restore backup_20241220_150000.sql

# Reconstruir imágenes
./deploy.sh build
```

## 🌍 Configuración de Dominio

### Para usar con tu dominio:

1. **Apuntar DNS a tu VPS:**

   ```
   A record: portaldelabogado.com → IP_DE_TU_VPS
   A record: www.portaldelabogado.com → IP_DE_TU_VPS
   ```

2. **Actualizar configuración:**

   ```bash
   # En .env
   DOMAIN=portaldelabogado.com
   EMAIL=tu-email@ejemplo.com
   ```

3. **Usar Traefik para SSL automático:**
   ```bash
   ./deploy.sh deploy --with-traefik
   ```

## 🔒 SSL/HTTPS

### Opción 1: Traefik (Recomendado)

```bash
# Despliegue con SSL automático
./deploy.sh deploy --with-traefik

# Solo configurar SSL
./deploy.sh ssl
```

### Opción 2: Nginx + Certbot

```bash
# En tu VPS, después del despliegue con --with-nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d portaldelabogado.com -d www.portaldelabogado.com
```

## 📊 Monitoreo y Logs

### Ver logs:

```bash
# Logs de todos los servicios
./deploy.sh logs

# Logs específicos
docker-compose logs -f portal-app
docker-compose logs -f nginx
docker-compose logs -f postgres
```

### Health checks:

```bash
# Verificar salud de la aplicación
curl http://localhost:8080/api/health

# Estado de contenedores
docker-compose ps
```

## 🔧 Troubleshooting

### Problemas comunes:

**Error: "bind: address already in use"**

```bash
# Verificar qué proceso usa el puerto
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :8080

# Detener servicios conflictivos
sudo systemctl stop apache2  # o nginx si está instalado globalmente
```

**Error: "permission denied"**

```bash
# Verificar permisos de Docker
sudo usermod -aG docker $USER
newgrp docker
```

**Aplicación no responde:**

```bash
# Verificar logs
./deploy.sh logs

# Reiniciar servicios
./deploy.sh restart

# Verificar recursos
htop
df -h
```

**SSL no funciona:**

```bash
# Verificar configuración de Traefik
docker-compose logs traefik

# Verificar DNS
nslookup portaldelabogado.com
```

## 🔄 Actualizaciones

Para actualizar la aplicación:

```bash
# 1. Obtener últimos cambios
git pull

# 2. Reconstruir y redesplegar
./deploy.sh build
./deploy.sh restart
```

## 🛡️ Seguridad

### Recomendaciones:

- ✅ Usar contraseñas fuertes
- ✅ Configurar firewall (ufw)
- ✅ Mantener sistema actualizado
- ✅ Usar SSL/HTTPS
- ✅ Configurar backups automáticos
- ✅ Monitorear logs regularmente

### Configurar firewall:

```bash
# Configurar UFW
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 📱 URLs de Acceso

Después del despliegue exitoso:

| Servicio          | URL                 | Descripción               |
| ----------------- | ------------------- | ------------------------- |
| Aplicación        | `http://tu-ip:8080` | Portal de Abogados        |
| Nginx             | `http://tu-ip`      | A través de reverse proxy |
| Traefik Dashboard | `http://tu-ip:8090` | Panel de control          |
| PostgreSQL        | `tu-ip:5432`        | Base de datos (interno)   |

## 🆘 Soporte

Si encuentras problemas:

1. Revisar logs: `./deploy.sh logs`
2. Verificar estado: `./deploy.sh status`
3. Consultar documentación de Docker Compose
4. Verificar recursos del servidor: `htop`, `df -h`

---

¡Tu Portal de Abogados está listo para producción! 🎉
