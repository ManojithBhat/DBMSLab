# backend/Dockerfile
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port your backend listens on
EXPOSE 3000

# Specify the command to start the application
CMD ["node", "run","dev"]
