let mongoose = require('mongoose');

let Currency = new mongoose.Schema({
    currency: String
});

Currency.methods.toJson = function () {
    return {
        currency: this.currency
    }
};

module.exports = mongoose.model('Currency', Currency);
