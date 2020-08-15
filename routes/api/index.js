let mongoose = require('mongoose');
let router = require("express").Router();
let Currency = mongoose.model("Currency");

let axios = require('axios');

async function getExchangeRate(baseCurrency){
    const res = await ax.get(`${baseCurrency}`);
    return res;
}

const ax = axios.create({
    baseURL: "https://api.ratesapi.io/api/latest",
    headers: {
        "Content-Type": "application/json"
    }
});

// Test if server works
router.get("/ping", function (req, res, next) {
    return res.json({pong: "true"});
});

// Returns all currencies
router.get("/currencies",function (req, res, next) {
    Promise.all([Currency.find({}).sort({currency: "desc"})]).then(function (results) {
        return res.json({
            currencies: results[0].map(item => {
                return item
            })
        })
    })
});

// Return exchange rate based on queried currency
router.get("/exchange_rates/:currency", function (req, res, next) {
    const baseCurrency = req.params['currency'];
    const response = getExchangeRate(baseCurrency)
        .then(res => {
        if(res.status !== 200){
            throw Error(res.statusText);
        } else {
            const rates = res.data;
            return res.json(response.data);
        }
    })
        .catch(e => {res.json(e)});
});

// Bouns:Return exchange rate based on given query parameter
router.get("/exchange_rates/", function (req, res, next) {

});

module.exports = router;
