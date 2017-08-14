Ask Around API
==================================

This is the first big NodeJS * Express project which will try to replicate the Pyramid API of the Ask Around application.

- Offers JWT / OAuth2 authentication.
- Real-time communication between users.
- Real-time update of questions and replies.
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

Getting Started
---------------

```sh
# clone it
SSH: git clone git@github.com:NoMercy235/ask-around-api.git
HTTPS: git clone https://github.com/NoMercy235/ask-around-api.git

# Navigate to it
cd ask-around-api

# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```
Docker Support
------
```sh
cd express-es6-rest-api

# Build your docker
docker build -t ask-around .
#            ^      ^      ^
#          tag  tag name   Dockerfile location

# run your docker
docker run -p 8080:8080 ask-around
#                 ^         ^
#          bind the port    container tag
#          to your host
#          machine port   

```

License
-------

MIT
