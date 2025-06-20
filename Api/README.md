# Portal de Abogados - API Server

Servidor SPA (Single Page Application) en Go que sirve la aplicación Angular compilada.

## Estructura del Proyecto

```
Api/
├── main.go              # Servidor principal Go
├── go.mod              # Dependencias Go
├── wwwroot/            # Archivos estáticos de Angular (compilados)
│   ├── index.html      # Punto de entrada de la SPA
│   ├── *.js            # Archivos JavaScript compilados
│   ├── *.css           # Archivos CSS compilados
│   └── images/         # Recursos de imagen
└── README.md           # Este archivo
```

## Funcionalidades

- ✅ Servir archivos estáticos de Angular desde `wwwroot/`
- ✅ Manejo correcto de routing de SPA (redirección a index.html)
- ✅ Headers de cache optimizados para archivos estáticos
- ✅ Tipos MIME correctos para todos los archivos
- ✅ Endpoint de salud en `/api/health`
- ✅ Configuración de puerto via variable de entorno

## Instalación y Uso

### Prerrequisitos
- Go 1.21 o superior
- Los archivos de Angular ya compilados en `wwwroot/`

### Comandos

1. **Instalar dependencias:**
   ```bash
   go mod tidy
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   go run main.go
   ```

3. **Compilar para producción:**
   ```bash
   go build -o portal-api main.go
   ```

4. **Ejecutar compilado:**
   ```bash
   ./portal-api
   ```

### Configuración

- **Puerto:** Por defecto usa el puerto 8080, puede cambiarse con la variable de entorno `PORT`
  ```bash
  PORT=3000 go run main.go
  ```

### URLs Disponibles

- **Aplicación Angular:** `http://localhost:8080/`
- **Health Check:** `http://localhost:8080/api/health`
- **Todos los archivos estáticos:** `http://localhost:8080/*`

## Características Técnicas

### Manejo de SPA Routing
El servidor está configurado para manejar correctamente el routing del lado cliente de Angular:
- Si un archivo existe en `wwwroot/`, lo sirve directamente
- Si no existe, sirve `index.html` para que Angular maneje la ruta
- Esto permite que URLs como `/dashboard`, `/profile`, etc. funcionen correctamente

### Optimización de Cache
- **Archivos estáticos** (JS, CSS, imágenes): Cache de 1 año
- **index.html**: Sin cache para actualizaciones inmediatas

### API Ready
El servidor incluye un prefijo `/api` listo para agregar endpoints de backend según sea necesario.

## Desarrollo

Para agregar nuevos endpoints de API, modifica la sección correspondiente en `main.go`:

```go
api := router.PathPrefix("/api").Subrouter()
api.HandleFunc("/health", healthCheck).Methods("GET")
// Agregar más endpoints aquí
```

## Producción

Para despliegue en producción, considera:
1. Compilar con optimizaciones: `go build -ldflags="-w -s" -o portal-api main.go`
2. Usar un proxy reverso (nginx, Apache) si es necesario
3. Configurar HTTPS
4. Monitorear el endpoint `/api/health`
