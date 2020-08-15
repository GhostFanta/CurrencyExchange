# CurrencyExchange

> A node.js based backend service aimming at providing currency exchange functionality.

Check out the API document on: http://159.203.17.226:84/docs

### Requirements:

+ [x] Create Node.js API 
+ [x] Connect to RatesApi.io 
+ [x] Create 2 routes. One route returns all the currencies, the other route takes in a currency as a route parameter and returns the exchange rate for that currency
+ [x] Setup docker container
+ [x] Deploy Node.js code on a server, any server.
+ [x] Bonus: add another route that accepts the base as a query parameter. I.e api.com/CAD?base=USD **(Ps: I assume this endpoint reflect a one-to-one relation, that is, we only consider rates between two currencies)**

### Dependencies
+ axios: rest api client
+ express: RESTful api framework
+ mongoose: currency info storage
+ nodemon: dev app executor

### Setup
Run in dev mode:
```
npm run dev
```

Run in prod mode:
```
npm start
```

Run in dockerized mode:
```
docker-compose up --build -d
```
