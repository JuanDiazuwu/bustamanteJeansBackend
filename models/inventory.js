const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
});

class Inventory {
    constructor(products){
        this._products = products;
    }

    get products(){ return this._products; }
    set products(v){ this._products = v; }

}

schema.loadClass(Inventory);
module.exports = mongoose.model('Inventory', schema);