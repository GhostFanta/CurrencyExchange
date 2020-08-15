let http = require('http'),
    methods = require("methods"),
    express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose");

console.log(process.env.NODE_ENV);

let app = express();

let isProd = process.env.NODE_ENV === "production";

if(isProd) {
    mongoose.connect("mongodb://currency_mongo/currencies")
} else {
    mongoose.connect("mongodb://localhost/currencies");
    mongoose.set("debug", true);
}

require('./routes/models/currency');

app.use(cors());
app.use(require("./routes"));

let server = app.listen(process.env.PORT || 3006, function () {
    // console.log("Listen on port " + server.address().port())
});
