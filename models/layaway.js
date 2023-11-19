const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _client:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    _products:[{
        type:mongoose.Schema.ObjectId,
        ref:'Product'
    }],
    _state:Boolean,
    _startDate:Date,
    _endingDate:Date
});

class Layaway {
    constructor(client, products, state, startDate, endingDate){
        this._client = client;
        this._products = products;
        this._state = state;
        this._startDate = startDate;
        this._endingDate = endingDate;
    }

    get client(){ return this._client; }
    set client(v){ this._client = v; }

    get products(){ return this._products; }
    set products(v){ this._products = v; }

    get state(){ return this._state; }
    set state(v){ this._state = v; }

    get startDate(){ return this._startDate; }
    set startDate(v){ this._startDate = v; }

    get endingDate(){ return this._endingDate; }
    set endingDate(v){ this._endingDate = v; }

}

schema.loadClass(Layaway);
module.exports = mongoose.model('Layaway', schema);
