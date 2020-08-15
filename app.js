let http = require('http'),
    bodyParser = require('body-parser'),
    methods = require("methods"),
    express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose");

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require("./docs/swagger");

console.log(process.env.NODE_ENV);

let app = express();

let isProd = process.env.NODE_ENV === "production";

if(isProd) {
    mongoose.connect("mongodb://currency_mongo:27017/currency")
} else {
    mongoose.connect("mongodb://localhost:27017/currency");
    mongoose.set("debug", true);
}

require('./routes/models/currency');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());
app.use(require("./routes"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let server = app.listen(process.env.PORT || 3006, function () {
    // console.log("Listen on port " + server.address().port())
});
