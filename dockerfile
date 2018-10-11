FROM node:alpine

# Create work directory
WORKDIR /usr/src/app

# Copy app dist to work directory
COPY dist/ /usr/src/app/dist/
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY package-scripts.js /usr/src/app

# Install app dependencies
RUN npm install --only=prod

# Build and run the app
CMD npm start