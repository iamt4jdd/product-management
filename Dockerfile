# build
FROM node:20.9.0-alpine3.18 as builder
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the Angular application
RUN npm run build --prod

### STAGE 2: RUN ###
# Use an official Nginx runtime as a production image
FROM nginx:latest

# Copy the compiled application files from the builder stage to the nginx HTML directory
COPY --from=builder /app/dist/product-management /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80