# Base Node.js image
FROM node:16.20-bullseye-slim

# Set environment variables for production
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongodb-container/microservices
ENV PORT=5003


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies only (for security)
RUN npm ci --only=production && \
    npm cache clean --force

# Copy the rest of the source code
COPY . .

# Create the build directory and set appropriate permissions
RUN mkdir -p /app/build && \
    chown -R node:node /app/build

# Expose the port on which the application listens
EXPOSE 5003

# Use a non-root user for security reasons
USER node

# Start the application
CMD ["npm","run" ,"start:prod"]

# Specify the microservice-specific labels
LABEL version="1.0" description="Payment microservice"



