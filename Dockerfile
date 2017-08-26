FROM node:slim

# File Author / Maintainer
LABEL authors="Alexandru Florian Barascu <alex.florin235@yahoo.com>"
MAINTAINER alex.florin235@yahoo.com

ENV PORT=8080

# Set work directory to /www
WORKDIR /www

# Install app dependencies
COPY package.json /www/package.json
RUN npm install

# Copy app source
COPY . /www

# expose the port to outside world
EXPOSE $PORT

# start command as per package.json
CMD ["npm", "start"]
