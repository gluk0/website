FROM node:18-alpine AS build

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        dumb-init \
        tini && \
    rm -rf /var/cache/apk/*

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm ci --only=production --audit && \
    npm cache clean --force

COPY --chown=node:node . .

RUN npm run build



FROM nginx:1.25-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        dumb-init \
        curl && \
    rm -rf /var/cache/apk/*

RUN deluser nginx && \
    delgroup nginx && \
    addgroup -g 1000 nginx && \
    adduser -u 1000 -G nginx -s /bin/sh -D nginx

RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp /var/cache/nginx/scgi_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx

# Update nginx.conf to use /tmp for PID file (non-root compatible)
RUN sed -i 's|pid\s*/var/run/nginx.pid;|pid /tmp/nginx.pid;|g' /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx-http.conf /etc/nginx/conf.d/01-http.conf
COPY --chown=nginx:nginx nginx-security.conf /etc/nginx/conf.d/02-security.conf
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/03-default.conf


COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html


RUN echo 'server { listen 8080; location /health { access_log off; return 200 "healthy\n"; add_header Content-Type text/plain; } }' > /etc/nginx/conf.d/health.conf
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \; && \
    find /usr/share/nginx/html -type f -exec chmod 644 {} \;


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

USER nginx

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"] 