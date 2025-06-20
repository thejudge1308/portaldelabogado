# ====================
# Multi-stage Dockerfile para Portal de Abogados
# Compilar Angular + Go y crear imagen optimizada para producción
# ====================

# ====================
# STAGE 1: Build Angular Application
# ====================
FROM node:20-alpine AS angular-build

WORKDIR /app/Web

# Copy package files for dependency installation
COPY Web/package*.json ./

# Install dependencies
RUN npm ci
# Copy Angular source code
COPY Web/ ./

# Build Angular application for production
# Esto compilará directamente en ../Api/wwwroot según angular.json
RUN npm run build:prod

# ====================
# STAGE 2: Build Go Application
# ====================
FROM golang:1.21-alpine AS go-build

WORKDIR /app

# Install git (needed for some Go modules)
RUN apk add --no-cache git

# Copy go.mod and go.sum
COPY Api/go.mod Api/go.sum ./

# Download Go dependencies
RUN go mod download

# Copy Go source code
COPY Api/ ./

# Copy compiled Angular files from previous stage
COPY --from=angular-build /app/Api/wwwroot ./wwwroot

# Build Go application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s -X main.version=production" \
    -o portal-api main.go

# ====================
# STAGE 3: Production Image
# ====================
FROM alpine:latest AS production

# Add ca-certificates for HTTPS requests and timezone data
RUN apk --no-cache add ca-certificates tzdata

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# Copy binary and static files from build stage
COPY --from=go-build /app/portal-api .
COPY --from=go-build /app/wwwroot ./wwwroot

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Set environment variables
ENV PORT=8080
ENV GIN_MODE=release

# Run the application
CMD ["./portal-api"]
