package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

// Estructuras para las respuestas API
type APIResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Results interface{} `json:"results,omitempty"`
	Status  string      `json:"status"`
}

type LawyerSearchRequest struct {
	Specialty   string `json:"specialty"`
	Location    string `json:"location"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Description string `json:"description"`
}

type Specialty struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Location struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// SPAHandler - Maneja archivos estáticos y routing de Angular
type SPAHandler struct {
	staticPath string
	indexPath  string
}

func (h SPAHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Construir la ruta del archivo
	path := filepath.Join(h.staticPath, r.URL.Path)

	// Verificar si es un archivo que existe
	if _, err := os.Stat(path); os.IsNotExist(err) {
		// Si no existe, servir index.html (para routing de Angular)
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// Error al acceder al archivo
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Si es un directorio, servir index.html
	if stat, err := os.Stat(path); err == nil && stat.IsDir() {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	}

	// Configurar headers para archivos estáticos
	setStaticHeaders(w, path)

	// Servir el archivo
	http.ServeFile(w, r, path)
}

// Configurar headers de cache para archivos estáticos
func setStaticHeaders(w http.ResponseWriter, path string) {
	ext := filepath.Ext(path)

	switch ext {
	case ".js", ".css":
		// Cache por 1 año para JS y CSS con hash
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	case ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot":
		// Cache por 1 año para assets
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	case ".html":
		// No cache para HTML
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
	default:
		// Cache por 1 día para otros archivos
		w.Header().Set("Cache-Control", "public, max-age=86400")
	}

	// Headers de seguridad
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("X-Frame-Options", "DENY")
	w.Header().Set("X-XSS-Protection", "1; mode=block")
}

// Middleware CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// En desarrollo, permitir localhost:4200
		allowedOrigins := []string{
			"http://localhost:4200",
			"http://127.0.0.1:4200",
		}
		
		// En producción, agregar tu dominio
		if domain := os.Getenv("DOMAIN"); domain != "" {
			allowedOrigins = append(allowedOrigins, "https://"+domain, "http://"+domain)
		}
		
		// Verificar si el origin está permitido
		originAllowed := false
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				originAllowed = true
				break
			}
		}
		
		if originAllowed || origin == "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Middleware de logging
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

// Helper para respuestas JSON
func sendJSONResponse(w http.ResponseWriter, status int, data APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

// API Handlers
func healthCheck(w http.ResponseWriter, r *http.Request) {
	response := APIResponse{
	Message: "Portal del Abogado API está funcionando",
		Status:  "healthy",
		Data: map[string]interface{}{
			"service":   "portal-abogados-api",
			"version":   "1.0.0",
			"timestamp": time.Now().UTC(),
			"mode":      os.Getenv("MODE"),
		},
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func getSpecialties(w http.ResponseWriter, r *http.Request) {
	specialties := []Specialty{
		{ID: "civil", Name: "Derecho Civil"},
		{ID: "penal", Name: "Derecho Penal"},
		{ID: "laboral", Name: "Derecho Laboral"},
		{ID: "familiar", Name: "Derecho Familiar"},
		{ID: "corporativo", Name: "Derecho Corporativo"},
		{ID: "inmobiliario", Name: "Derecho Inmobiliario"},
		{ID: "tributario", Name: "Derecho Tributario"},
		{ID: "migratorio", Name: "Derecho Migratorio"},
	}

	response := APIResponse{
		Message: "Especialidades obtenidas exitosamente",
		Status:  "success",
		Results: specialties,
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func getLocations(w http.ResponseWriter, r *http.Request) {
	locations := []Location{
		{ID: "santiago", Name: "Región Metropolitana"},
		{ID: "valparaiso", Name: "Región de Valparaíso"},
		{ID: "biobio", Name: "Región del Biobío"},
		{ID: "araucania", Name: "Región de La Araucanía"},
		{ID: "los-lagos", Name: "Región de Los Lagos"},
		{ID: "maule", Name: "Región del Maule"},
		{ID: "antofagasta", Name: "Región de Antofagasta"},
		{ID: "coquimbo", Name: "Región de Coquimbo"},
	}

	response := APIResponse{
		Message: "Ubicaciones obtenidas exitosamente",
		Status:  "success",
		Results: locations,
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func submitContact(w http.ResponseWriter, r *http.Request) {
	var searchRequest LawyerSearchRequest

	if err := json.NewDecoder(r.Body).Decode(&searchRequest); err != nil {
		response := APIResponse{
			Message: "Error al procesar la solicitud",
			Status:  "error",
		}
		sendJSONResponse(w, http.StatusBadRequest, response)
		return
	}

	// Aquí procesarías la información (guardar en BD, enviar email, etc.)
	log.Printf("Nueva solicitud de contacto: %+v", searchRequest)

	response := APIResponse{
		Message: "Solicitud enviada exitosamente. Pronto te contactaremos.",
		Status:  "success",
		Data: map[string]interface{}{
			"request_id":   "REQ-" + strings.ToUpper(time.Now().Format("20060102150405")),
			"submitted_at": time.Now().UTC(),
		},
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func searchLawyers(w http.ResponseWriter, r *http.Request) {
	var searchRequest LawyerSearchRequest

	if err := json.NewDecoder(r.Body).Decode(&searchRequest); err != nil {
		response := APIResponse{
			Message: "Error al procesar la búsqueda",
			Status:  "error",
		}
		sendJSONResponse(w, http.StatusBadRequest, response)
		return
	}

	// Aquí implementarías la lógica de búsqueda real
	log.Printf("Búsqueda de abogados: %+v", searchRequest)

	// Resultados de ejemplo
	mockResults := []map[string]interface{}{
		{
			"id":         "1",
			"name":       "Juan Pérez García",
			"specialty":  searchRequest.Specialty,
			"location":   searchRequest.Location,
			"rating":     4.8,
			"experience": "15 años",
		},
		{
			"id":         "2",
			"name":       "María González López",
			"specialty":  searchRequest.Specialty,
			"location":   searchRequest.Location,
			"rating":     4.9,
			"experience": "12 años",
		},
	}

	response := APIResponse{
		Message: "Búsqueda completada exitosamente",
		Status:  "success",
		Results: mockResults,
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func getLawyers(w http.ResponseWriter, r *http.Request) {
	// Lista general de abogados
	response := APIResponse{
		Message: "Lista de abogados obtenida",
		Status:  "success",
		Results: []map[string]interface{}{
			{"id": "1", "name": "Juan Pérez", "specialty": "civil"},
			{"id": "2", "name": "María González", "specialty": "penal"},
		},
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func getLawyer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	// Datos de ejemplo del abogado
	lawyerData := map[string]interface{}{
		"id":          id,
		"name":        "Juan Pérez García",
		"specialty":   "Derecho Civil",
		"location":    "Santiago",
		"rating":      4.8,
		"experience":  "15 años",
		"description": "Especialista en derecho civil con amplia experiencia...",
	}

	response := APIResponse{
		Message: "Datos del abogado obtenidos exitosamente",
		Status:  "success",
		Data:    lawyerData,
	}
	sendJSONResponse(w, http.StatusOK, response)
}

func main() {
	r := mux.NewRouter()

	// Middleware
	r.Use(corsMiddleware)
	r.Use(loggingMiddleware)

	// API Routes - Solo rutas que empiecen con /api
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/health", healthCheck).Methods("GET")
	api.HandleFunc("/specialties", getSpecialties).Methods("GET")
	api.HandleFunc("/locations", getLocations).Methods("GET")
	api.HandleFunc("/contact", submitContact).Methods("POST")
	api.HandleFunc("/search", searchLawyers).Methods("POST")
	api.HandleFunc("/lawyers", getLawyers).Methods("GET")
	api.HandleFunc("/lawyers/{id}", getLawyer).Methods("GET")

	// Directorio donde están los archivos de Angular compilados
	staticDir := "./portaldelabogado"
	if dir := os.Getenv("STATIC_DIR"); dir != "" {
		staticDir = dir
	}

	// Verificar que el directorio existe
	log.Printf("🔍 Verificando directorio estático: %s", staticDir)
	if _, err := os.Stat(staticDir); os.IsNotExist(err) {
		log.Printf("❌ Directorio de archivos estáticos '%s' no existe", staticDir)
		log.Printf("📁 Archivos disponibles en directorio actual:")
		if files, err := os.ReadDir("."); err == nil {
			for _, file := range files {
				log.Printf("   %s", file.Name())
			}
		}
		log.Printf("Ejecuta 'ng build --configuration spa-prod' desde el directorio Web/")
		// Crear directorio temporal con mensaje
		os.MkdirAll(staticDir, 0755)
		indexContent := `<!DOCTYPE html>
<html>
<head><title>Portal del Abogado</title></head>
<body>
    <h1>Portal del Abogado - En construcción</h1>
    <p>Los archivos de Angular no han sido compilados aún.</p>
    <p>Ejecuta: <code>cd Web && ng build --configuration spa-prod</code></p>
    <p>API disponible en: <a href="/api/health">/api/health</a></p>
</body>
</html>`
		os.WriteFile(filepath.Join(staticDir, "index.html"), []byte(indexContent), 0644)
	} else {
		log.Printf("✅ Directorio de archivos estáticos encontrado: %s", staticDir)
		if files, err := os.ReadDir(staticDir); err == nil {
			log.Printf("📁 Archivos en %s:", staticDir)
			for _, file := range files {
				log.Printf("   %s", file.Name())
			}
		}
	}

	// SPA Handler para servir Angular y manejar routing
	spa := SPAHandler{staticPath: staticDir, indexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mode := os.Getenv("MODE")
	if mode == "" {
		mode = "development"
	}

	log.Printf("🚀 Portal del Abogado SPA iniciando...")
	log.Printf("📦 Modo: %s", mode)
	log.Printf("🌐 Puerto: %s", port)
	log.Printf("📁 Archivos estáticos: %s", staticDir)
	log.Printf("🔌 API: http://localhost:%s/api/", port)
	log.Printf("🏠 App: http://localhost:%s/", port)

	log.Fatal(http.ListenAndServe(":"+port, r))
}
