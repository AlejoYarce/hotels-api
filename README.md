# Simple Hotels API

> Express & MongoDB Project

## Prerequisites

### MongoDB
- Setup the MongoDB Community Edition
  - [Install](https://docs.mongodb.com/manual/installation/)
- Run MongoDB
  - [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb)
  - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition)
  - [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition)
- By default, Mongo will run on localhost:27017
  - You can change it running --> ```mongo --host HOST:PORT```

## Project Structure
- **Models**
  - Hotels Model
- **Controllers**
  - Hotels Controller handling request
- **Routes**
  - Handling routes for CRUD request
  - `/` --> Test route showing *Connected* message
  - `/hotels` --> GET & POST
  - `/hotels/:id` --> GET, PUT & DELETE
- **Public**
  - `/img` --> Hotels photos *Place here new photos in case you create a new Hotel*

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload (nodemon) at localhost:3000
$ npm run dev
```
