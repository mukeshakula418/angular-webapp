FROM node:16-alpine AS builder

WORKDIR /app

# Copy the source code
COPY . .

# Install project dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight HTTP server
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist/angular-webapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
