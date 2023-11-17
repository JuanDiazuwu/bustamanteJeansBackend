const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
});

class Catalog {
    constructor(products){
        this._product = products;
    }

    get products(){ return this._products; }
    set products(v){ this._products = v; }

}

schema.loadClass(Catalog);
module.exports = mongoose.model('Catalog', schema);
