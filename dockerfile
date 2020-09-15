# Use the official image as a parent image.
FROM node:current-slim

WORKDIR /usr/src

RUN npm install --global gulp-cli

# Copy front
COPY frontend /usr/src/frontend
WORKDIR /usr/src/frontend
RUN npm install
RUN gulp

WORKDIR /usr/src

COPY backend /usr/src/backend
WORKDIR /usr/src/backend
RUN npm install

EXPOSE 8080

CMD [ "node", "/usr/src/backend/index.js" ]