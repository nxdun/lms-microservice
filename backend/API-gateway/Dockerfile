# Dockerfile

# Use a base image
FROM node:21.6.1-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# expose the port
EXPOSE 5000

# Copy the entire src directory
COPY . .

# Install nodemon globally
RUN npm i -g nodemon

# Command to run the application
CMD ["nodemon", "index.js"]

