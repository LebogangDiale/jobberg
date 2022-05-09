# Create image based on the official Node 6 image from the dockerhub
FROM node:16-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# # Copy dependency definitions
# COPY package*.json ./
COPY package.json /usr/src/app


# Install dependencies
RUN npm install\
    && npm prune --production
# If you are building your code for production

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 4316

# Serve the app
CMD ["npm","run", "start"]