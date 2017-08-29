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

# Start development (use `./kill.bat` if you're on windows and the port is occupied):
npm start
```

Create a `config.js` file in the `src` directory with the following template:

```javascript
{
    "secret": "secret_string",
    "database": "mongo url"
}
```


Docker Support
------
```sh
cd ask-around-api

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

Or you can use `docker-compose` in order to spin up both the app and the mongo db and create a network with the two of them:

```sh
cd ask-around-api

docker-compose build
docker-compose up -d

# For shutdown and cleanup
docker-compose down

```

License
-------

MIT
