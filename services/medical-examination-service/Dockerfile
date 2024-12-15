# Use official Node.js alpine image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install necessary dependencies
RUN apk add --no-cache bash

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3002

# Command to run the application
CMD ["npm", "run", "start:prod"]