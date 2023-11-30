const mongoose = require('mongoose');

const enumCategory = ['Pantalon', 'Accesorio', 'Calzado'];

const schema = mongoose.Schema({
    _name:String,
    _description:String,
    _price:Number,
    _quantity:Number,// cantidad
    _category:{
        type:String,
        enum: enumCategory
    }
});

class Product {
    constructor(name, description, price, quantity, category){
        this._name = name;
        this._description = description;
        this._price = price;
        this._quantity = quantity;
        this._category = category;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get description(){ return this._description; }
    set description(v){ this._description = v; }

    get price(){ return this._price; }
    set price(v){ this._price = v; }

    get quantity(){ return this._quantity; }
    set quantity(v){ this._quantity = v; }

    get category(){ return this._category; }
    set category(v){ this._category = v; }

}

schema.loadClass(Product);
module.exports = mongoose.model('Product', schema);