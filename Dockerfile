# Stage 1: Build the application
FROM node:16.20-bullseye-slim AS build

# Set environment variables
ENV NODE_ENV=development
<<<<<<< HEAD
=======
ENV MONGO_URI=mongodb://mongodb-service/microservices
ENV ORDERS_SERVER=http://order-service:5002/api
ENV PORT=5003
ENV RABBIT_MQ_URI=amqp://rabbitmq-service:5672


>>>>>>> 69fdadfd78d1a78bdb5a92225e9ef958bb8fbf1c

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:16.20-bullseye-slim

# Set environment variables
ENV NODE_ENV=production
<<<<<<< HEAD
ENV PORT=5003
=======
ENV MONGO_URI=mongodb://mongodb-service/microservices
ENV ORDERS_SERVER=http://order-service:5002/api
ENV PORT=5003
ENV RABBIT_MQ_URI=amqp://rabbitmq-service:5672

>>>>>>> 69fdadfd78d1a78bdb5a92225e9ef958bb8fbf1c

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the previous stage
COPY --from=build /app/build ./build

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Expose the port on which the application listens
EXPOSE 5003

# Use a non-root user for security reasons
USER node

# Start the application
<<<<<<< HEAD
CMD ["node", "build/server.js"]
=======
CMD ["node", "build/server.js"]
>>>>>>> 69fdadfd78d1a78bdb5a92225e9ef958bb8fbf1c
