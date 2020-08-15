let mongoose = require('mongoose');
let router = require("express").Router();
let Currency = mongoose.model("Currency");

let axios = require('axios');

function getExchangeRate(baseCurrency){
    return ax.get(`?base=${baseCurrency}`);
}

function getQueriedExchangeRate(baseCurrency, symbol) {
    return ax.get(`?base=${baseCurrency}&symbols=${symbol}`);
}

const ax = axios.create({
    baseURL: "https://api.ratesapi.io/api/latest",
    headers: {
        "Content-Type": "application/json"
    }
});

// Test if server works
router.get("/ping", function (req, res ) {
    return res.json({pong: "true"});
});

// Returns all currencies
router.get("/currencies", function (req, res, next) {
    Promise.all([Currency.find({}).sort({currency: "desc"})]).then(function (results) {
        return res.json(
            results[0].map(item => {
                return item.toJson();
            })
        )
    })
});

// Return exchange rate based on queried currency + Bouns:Return exchange rate based on given query parameter
router.get("/exchange_rates/:currency", function ( req, res ) {
    const base = req.query.base;
    const currency = req.params['currency'];
    if (base){
        const response = getQueriedExchangeRate(base, currency)
            .then(response => {
                if(response.status !== 200) {
                    throw Error(res.statusText);
                } else {
                    const rates = response.data
                    return res.json(rates);
                }
            })
            .catch(e => {throw Error(e)});
    } else {
        const response = getExchangeRate(currency)
            .then(response => {
                if(response.status !== 200) {
                    throw Error(res.statusText);
                } else {
                    const rates = response.data;
                    return res.json(rates);
                }
            })
            .catch(e => {throw Error(e)});
    }
});

router.post("/currencies", function (req, res, next) {
    let currency = new Currency({currency: "AUD"});
    return currency.save().then(function () {
        return res.json({currency: currency.toJson()});
    })
});

module.exports = router;
