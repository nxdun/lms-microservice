# Dockerfile

# Use a base image
FROM node:21.6.1-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# expose the port
EXPOSE 2345

# Copy all project files
COPY . .

# Install nodemon globally
RUN npm i -g nodemon

# Command to run the application
CMD ["nodemon", "server.js"]
