# Build stage
FROM node:18-alpine AS build

# Security: Create non-root user
RUN addgroup -g 1000 appgroup && \
    adduser -u 1000 -G appgroup -s /bin/sh -D appuser

# Install security updates and required packages
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        dumb-init \
        tini && \
    rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Security: Change ownership and switch to non-root user
RUN chown -R appuser:appgroup /app
USER appuser

# Copy package files with proper ownership
COPY --chown=appuser:appgroup package*.json ./

# Install dependencies with security audit
RUN npm ci --only=production --audit && \
    npm cache clean --force

# Copy source code
COPY --chown=appuser:appgroup . .

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:1.25-alpine

# Install security updates
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        dumb-init \
        curl && \
    rm -rf /var/cache/apk/*

# Security: Create nginx user and group if they don't exist
RUN addgroup -g 1000 nginx || true && \
    adduser -u 1000 -G nginx -s /bin/sh -D nginx || true

# Remove default nginx configuration and copy custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx-security.conf /etc/nginx/conf.d/security.conf

# Copy built application from build stage
COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html

# Security: Create health check endpoint
RUN echo 'server { listen 8080; location /health { access_log off; return 200 "healthy\n"; add_header Content-Type text/plain; } }' > /etc/nginx/conf.d/health.conf

# Security: Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod -R 644 /usr/share/nginx/html/*

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Switch to non-root user
USER nginx

# Use dumb-init for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 