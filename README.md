# 🏛️ Portal de Abogados

Portal de Abogados es una plataforma web diseñada para conectar clientes con profesionales legales de manera eficiente y segura.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

- 👥 Registro de abogados y clientes
- 🔍 Búsqueda y filtrado de profesionales legales
- 💬 Sistema de mensajería segura
- 📅 Programación de citas
- 🔐 Autenticación y autorización
- 📱 Diseño responsivo

## 🛠️ Tecnologías

- **Frontend**: Angular 19 + Angular Material
- **Backend**: Go (Gin Framework)
- **Base de Datos**: PostgreSQL (opcional)
- **Cache**: Redis (opcional)
- **Containerización**: Docker + Docker Compose
- **Proxy**: Nginx / Traefik
- **SSL**: Let's Encrypt automático

## 📁 Estructura del Proyecto

```
portaldeabogados/
├── 🐳 Dockerfile                 # Imagen multi-stage
├── 🛠️ docker-compose.yml        # Orquestación completa
├── 🚀 deploy.sh                 # Script de despliegue automatizado
├── ✅ check-deployment.sh       # Verificación pre-despliegue
├── 📚 DEPLOYMENT.md             # Guía completa de despliegue
├── ⚙️ nginx.conf                # Configuración de Nginx
├── 🔐 .env.production           # Variables de entorno
├── 📱 Web/                      # Aplicación Angular
│   ├── src/                     # Código fuente
│   ├── package.json             # Dependencias npm
│   └── angular.json             # Configuración Angular
└── 🔧 Api/                      # Servidor Go
    ├── main.go                  # Servidor principal
    ├── go.mod                   # Dependencias Go
    ├── wwwroot/                 # Archivos estáticos (generados)
    └── README.md                # Documentación de la API
```

## 🚀 Inicio Rápido

### Para Desarrollo Local

1. **Clonar el repositorio:**

   ```bash
   git clone <tu-repo> portal-abogados
   cd portal-abogados
   ```

2. **Desarrollo Angular:**

   ```bash
   cd Web
   npm install
   npm start
   # La aplicación estará en http://localhost:4200
   ```

3. **Desarrollo Go (en otra terminal):**
   ```bash
   cd Api
   go mod tidy
   go run main.go
   # El servidor estará en http://localhost:8080
   ```

### Para Producción (Docker)

1. **Verificar prerrequisitos:**

   ```bash
   chmod +x check-deployment.sh deploy.sh
   ./check-deployment.sh
   ```

2. **Desplegar aplicación:**

   ```bash
   # Despliegue básico
   ./deploy.sh deploy

   # Con SSL automático
   ./deploy.sh deploy --with-traefik

   # Completo con base de datos
   ./deploy.sh deploy --with-database --with-nginx
   ```

3. **Verificar estado:**
   ```bash
   ./deploy.sh status
   ./deploy.sh logs
   ```

## 📖 Documentación

- 🚀 **[Guía de Despliegue](DEPLOYMENT.md)** - Instrucciones completas para VPS
- 🔧 **[API Documentation](Api/README.md)** - Documentación del servidor Go
- 📱 **[Frontend Guide](Web/README.md)** - Guía del desarrollo Angular

## 🌐 URLs de Acceso

Después del despliegue:

| Servicio                 | URL                                | Descripción               |
| ------------------------ | ---------------------------------- | ------------------------- |
| **Aplicación Principal** | `http://localhost:8080`            | Portal de Abogados        |
| **Con Nginx**            | `http://localhost`                 | A través de reverse proxy |
| **API Health Check**     | `http://localhost:8080/api/health` | Estado de la API          |
| **Dashboard Traefik**    | `http://localhost:8090`            | Panel SSL (si aplica)     |

## 🛠️ Comandos de Gestión

```bash
# Desarrollo
cd Web && npm start              # Servidor de desarrollo Angular
cd Api && go run main.go        # Servidor de desarrollo Go

# Producción
./deploy.sh deploy              # Desplegar aplicación
./deploy.sh status              # Ver estado de servicios
./deploy.sh logs                # Ver logs en tiempo real
./deploy.sh restart             # Reiniciar servicios
./deploy.sh cleanup             # Limpiar recursos no utilizados

# Mantenimiento
./deploy.sh backup              # Backup de base de datos
./deploy.sh restore <archivo>   # Restaurar backup
```

## 🏗️ Proceso de Build

El Dockerfile utiliza un proceso multi-stage:

1. **Stage 1**: Compila Angular (`npm run build:prod`) → genera archivos en `Api/wwwroot`
2. **Stage 2**: Compila el servidor Go con los archivos estáticos incluidos
3. **Stage 3**: Imagen final optimizada con Alpine Linux

## 🔧 Configuración

### Variables de Entorno

Copia y edita `.env.production`:

```bash
# Aplicación
PORT=8080
GIN_MODE=release

# Base de datos (opcional)
DB_HOST=postgres
DB_PORT=5432
DB_NAME=portaldeabogados
DB_USER=portal_user
DB_PASSWORD=tu_password_seguro

# SSL (opcional)
DOMAIN=portaldelabogado.com
EMAIL=tu-email@ejemplo.com
```

### Opciones de Despliegue

- `--with-nginx`: Reverse proxy con optimizaciones
- `--with-database`: PostgreSQL para persistencia
- `--with-cache`: Redis para cache
- `--with-traefik`: SSL automático con Let's Encrypt

## 🧪 Testing

```bash
# Frontend tests
cd Web
npm test

# Backend tests
cd Api
go test ./...

# Verificación pre-despliegue
./check-deployment.sh
```

## 📊 Monitoreo

```bash
# Logs en tiempo real
./deploy.sh logs

# Estado de contenedores
docker-compose ps

# Verificar salud de la aplicación
curl http://localhost:8080/api/health
```

## 🔒 Seguridad

- ✅ Headers de seguridad configurados
- ✅ Rate limiting implementado
- ✅ SSL/TLS automático disponible
- ✅ Usuario no-root en contenedores
- ✅ Variables de entorno para secretos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- 📚 Ver [DEPLOYMENT.md](DEPLOYMENT.md) para guía completa
- 🐛 Reportar bugs en [Issues](https://github.com/tu-usuario/portal-abogados/issues)
- 💬 Preguntas en [Discussions](https://github.com/tu-usuario/portal-abogados/discussions)

---

**¡Portal de Abogados - Conectando justicia con tecnología!** ⚖️✨
