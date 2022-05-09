# Create image based on the official Node 10 image from dockerhub
FROM node:16.13.1-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY . .


# Install dependencies
RUN npm install

RUN npm run build

RUN rm -rf /usr/src/app/src
RUN rm -rf /usr/src/app/node_modules

# Expose the port the app runs in
EXPOSE 4315

# Serve the app
CMD ["npm", "run", "start:prod"]
