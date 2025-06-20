# 🏛️ Portal del Abogado

**Plataforma SPA para conectar clientes con abogados especializados**

🌐 **Sitio web**: [portaldelabogado.com](https://portaldelabogado.com)  
🔌 **API**: [portaldelabogado.com/api](https://portaldelabogado.com/api/health)

---

## 🏗️ **Arquitectura**

**SPA Unificada** donde **Golang sirve todo**:
- ⚖️ **Frontend**: Angular con Material Design
- 🔌 **Backend**: Golang con Gorilla Mux
- 📱 **Responsive**: Funciona en móviles y desktop
- 🔒 **SSL**: HTTPS con Let's Encrypt
- 🐳 **Docker**: Listo para containerización

### **Tecnologías**
- **Frontend**: Angular 17, Angular Material, TypeScript, SCSS
- **Backend**: Golang 1.21, Gorilla Mux, JSON REST API
- **Base de Datos**: PostgreSQL (opcional)
- **Deployment**: VPS con Nginx + SSL
- **Container**: Docker multi-stage build

---

## 🚀 **Desarrollo Local**

### **Opción 1: Desarrollo Separado (Recomendado)**
```bash
# Terminal 1: Backend Golang
cd Api
go run main.go
# API en http://localhost:8080/api/

# Terminal 2: Frontend Angular
cd Web  
ng serve --configuration spa-dev
# Frontend en http://localhost:4200 (con proxy automático)
```

### **Opción 2: SPA Integrada**
```bash
# 1. Build Angular para SPA
cd Web
ng build --configuration spa-dev

# 2. Ejecutar servidor completo
cd ../Api
go run main.go
# Todo en http://localhost:8080
```

### **Opción 3: Docker Desarrollo**
```bash
# Solo servicios auxiliares (BD, Redis)
docker-compose -f docker-compose.dev.yml up -d

# Desarrollar normalmente + usar BD en Docker
cd Web && ng serve --configuration spa-dev
```

---

## 📦 **Comandos de Build**

```bash
# Desarrollo SPA
ng build --configuration spa-dev

# Producción SPA  
ng build --configuration spa-prod

# Golang
cd Api
go build -o portal-delabogado-spa main.go

# Docker completo
docker-compose up --build
```

---

## 🌐 **Deployment en Producción**

### **Deployment Automático**
```bash
# Ejecutar script de deployment
chmod +x deploy-portaldelabogado.sh
./deploy-portaldelabogado.sh
```

### **Deployment Manual**
Ver [Guía de Deployment SSL](docs/SSL-DEPLOYMENT.md) para pasos detallados.

**Resumen rápido:**
1. **DNS**: Configurar `portaldelabogado.com` → IP VPS
2. **VPS**: Instalar Node.js, Golang, Nginx
3. **Build**: `ng build --configuration spa-prod`
4. **Deploy**: Systemd service + Nginx + SSL
5. **SSL**: `certbot --nginx -d portaldelabogado.com`

---

## 🔧 **Configuraciones**

### **Perfiles Angular**
| Perfil | Comando | Output | Uso |
|--------|---------|---------|-----|
| `spa-dev` | `ng build --configuration spa-dev` | `../Api/portaldelabogado/` | Desarrollo SPA |
| `spa-prod` | `ng build --configuration spa-prod` | `../Api/portaldelabogado/` | Producción SPA |
| `development` | `ng serve` | `dist/` | Desarrollo standalone |

### **Variables de Entorno**
```bash
# Copiar template
cp .env.example .env

# Para producción
cp .env.production .env

# Editar valores
nano .env
```

### **Endpoints API**
- `GET /api/health` - Health check
- `GET /api/specialties` - Especialidades legales
- `GET /api/locations` - Ubicaciones/regiones
- `POST /api/contact` - Enviar formulario de contacto
- `POST /api/search` - Buscar abogados
- `GET /api/lawyers` - Lista de abogados
- `GET /api/lawyers/{id}` - Abogado específico

---

## 📁 **Estructura del Proyecto**

```
portaldeabogados/
├── 📁 Web/                          # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   └── home/components/hero-section/
│   │   └── environments/
│   ├── angular.json                 # ✅ Configurado para SPA
│   └── proxy.conf.spa.json          # ✅ Proxy para desarrollo
├── 📁 Api/                          # Backend Golang
│   ├── portaldelabogado/            # 🔧 Angular compilado (generado)
│   ├── main.go                      # ✅ Servidor SPA completo
│   └── portal-delabogado-spa        # 🔧 Ejecutable (generado)
├── Dockerfile.yml                   # ✅ Multi-stage build
├── docker-compose.yml              # ✅ Producción
├── docker-compose.dev.yml          # ✅ Desarrollo
├── .env.production                  # ✅ Config producción
└── deploy-portaldelabogado.sh      # ✅ Script deployment
```

---

## 🧪 **Testing**

### **Local**
```bash
# Verificar API
curl http://localhost:8080/api/health

# Test formulario
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"specialty":"civil","location":"santiago","name":"Test","email":"test@test.com"}'
```

### **Producción**
```bash
# Verificar sitio
curl https://portaldelabogado.com/api/health

# Test SSL
openssl s_client -connect portaldelabogado.com:443

# Performance
curl -w "@curl-format.txt" -o /dev/null -s https://portaldelabogado.com
```

---

## 📊 **Monitoreo**

### **Logs**
```bash
# Servicio systemd
sudo journalctl -u portaldelabogado -f

# Docker
docker-compose logs -f portal-abogados-spa

# Nginx
tail -f /var/log/nginx/portaldelabogado.access.log
```

### **Métricas**
```bash
# Estado del servicio
sudo systemctl status portaldelabogado

# Uso de recursos
htop
df -h

# Conexiones de red
netstat -tlnp | grep 8080
```

---

## 🔄 **Actualizaciones**

```bash
# En VPS, ejecutar:
cd /opt/portaldelabogado
git pull origin main
cd Web && npm ci && ng build --configuration spa-prod  
cd ../Api && go build -o portal-delabogado-spa main.go
sudo systemctl restart portaldelabogado

# Verificar
curl https://portaldelabogado.com/api/health
```

---

## 🎯 **URLs del Proyecto**

### **Producción**
- 🌐 **Sitio**: https://portaldelabogado.com
- 🌐 **WWW**: https://www.portaldelabogado.com
- 🔌 **API**: https://portaldelabogado.com/api/health
- 📊 **Especialidades**: https://portaldelabogado.com/api/specialties

### **Desarrollo**
- 🧪 **SPA**: http://localhost:8080
- 🔧 **Angular Dev**: http://localhost:4200
- 🔌 **API Local**: http://localhost:8080/api/health
- 🗃️ **Adminer**: http://localhost:8081

---

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

---

## 🆘 **Soporte**

- 📧 **Email**: contacto@portaldelabogado.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/TU_USUARIO/portaldeabogados/issues)
- 📖 **Docs**: [Documentación completa](docs/)

---

**🏛️ Portal del Abogado** - Conectando abogados con clientes desde 2024
