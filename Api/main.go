package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
)

func main() {
	// Crear el router
	router := mux.NewRouter()

	// Configurar rutas de API (opcional para futuras funcionalidades)
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/health", healthCheck).Methods("GET")

	// Servir archivos estáticos y manejar SPA routing
	router.PathPrefix("/").HandlerFunc(spaHandler)

	// Configurar servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Servidor iniciado en puerto %s", port)
	log.Printf("Accede a la aplicación en: http://localhost:%s", port)
	
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}

// spaHandler maneja el serving de archivos estáticos y el routing de SPA
func spaHandler(w http.ResponseWriter, r *http.Request) {
	// Construir la ruta del archivo
	path := filepath.Clean(r.URL.Path)
	
	// Ruta completa al archivo en wwwroot
	fullPath := filepath.Join("wwwroot", path)
	
	// Verificar si el archivo existe
	if info, err := os.Stat(fullPath); err == nil && !info.IsDir() {
		// El archivo existe, servirlo directamente
		
		// Establecer headers de cache para archivos estáticos
		if isStaticAsset(path) {
			w.Header().Set("Cache-Control", "public, max-age=31536000") // 1 año
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		
		// Establecer Content-Type correcto
		setContentType(w, path)
		
		http.ServeFile(w, r, fullPath)
		return
	}
	
	// Si el archivo no existe o es un directorio, servir index.html
	// Esto permite que Angular maneje el routing del lado cliente
	indexPath := filepath.Join("wwwroot", "index.html")
	
	if _, err := os.Stat(indexPath); err != nil {
		http.Error(w, "index.html no encontrado", http.StatusNotFound)
		return
	}
	
	// Establecer headers para index.html
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	
	http.ServeFile(w, r, indexPath)
}

// isStaticAsset determina si un archivo es un asset estático que puede ser cacheado
func isStaticAsset(path string) bool {
	staticExtensions := []string{".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot"}
	
	ext := strings.ToLower(filepath.Ext(path))
	for _, staticExt := range staticExtensions {
		if ext == staticExt {
			return true
		}
	}
	
	return false
}

// setContentType establece el Content-Type correcto basado en la extensión del archivo
func setContentType(w http.ResponseWriter, path string) {
	ext := strings.ToLower(filepath.Ext(path))
	
	switch ext {
	case ".html":
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
	case ".css":
		w.Header().Set("Content-Type", "text/css")
	case ".js":
		w.Header().Set("Content-Type", "application/javascript")
	case ".json":
		w.Header().Set("Content-Type", "application/json")
	case ".png":
		w.Header().Set("Content-Type", "image/png")
	case ".jpg", ".jpeg":
		w.Header().Set("Content-Type", "image/jpeg")
	case ".gif":
		w.Header().Set("Content-Type", "image/gif")
	case ".svg":
		w.Header().Set("Content-Type", "image/svg+xml")
	case ".ico":
		w.Header().Set("Content-Type", "image/x-icon")
	case ".woff":
		w.Header().Set("Content-Type", "font/woff")
	case ".woff2":
		w.Header().Set("Content-Type", "font/woff2")
	case ".ttf":
		w.Header().Set("Content-Type", "font/ttf")
	case ".eot":
		w.Header().Set("Content-Type", "application/vnd.ms-fontobject")
	}
}

// healthCheck es un endpoint simple para verificar que la API está funcionando
func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok", "message": "Portal de Abogados API está funcionando"}`))
}
