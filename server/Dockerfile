# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# copy drizzle script
COPY drizzle.config.ts /app/drizzle.config.ts

# copy env file
COPY .env /app/.env

# Expose port 3333
EXPOSE 3333

# Command to run migrations and start the server
CMD ["sh", "-c", "npm run migrate && npm run dev"]
