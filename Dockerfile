FROM node

RUN apt update
RUN apt install -y nginx

# RUN apt install npm
RUN npm install --global gulp-cli

# Build front end
COPY frontend /usr/src/frontend
WORKDIR /usr/src/frontend
RUN npm install
RUN gulp

# Copy in back end
WORKDIR /usr/src
COPY backend /usr/src/backend
WORKDIR /usr/src/backend
RUN npm install

RUN rm /etc/nginx/sites-enabled/default

# Move front end to web root
RUN cp -r /usr/src/frontend/build/. /var/www/html/
# Copy ngnix config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

COPY startup.sh /usr/src

CMD ["/bin/bash", "/usr/src/startup.sh"]