const express = require('express');
const Product = require('../models/product');

function create(req, res, next){
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;

    let product = new Product({
        name:name, description:description, price:price, 
        quantity:quantity, category:category
    });

    product.save().then(obj => res.status(200).json({
        message:"Producto creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el producto",
        obj:ex
    }));
}

function list(req, res, next) {
    Product.find().then(objs => res.status(200).json({
        message:"Lista de productos",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de productos",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Product.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Producto con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el produto con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let description = req.body.description ? req.body.description : "";
    let price = req.body.price ? req.body.price : "";
    let quantity = req.body.quantity ? req.body.quantity : "";
    let category = req.body.category ? req.body.category : "";

    let product = new Object({
        _name:name, _description:description, _price:price, 
        _quantity:quantity, _category:category 
    });
    Product.findOneAndUpdate({"_id":id}, product, {new:true})
            .then(obj => res.status(200).json({
                message:`Producto reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el producto con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let category = req.body.category;

    let product = new Object();
    if(name) product._name = name;
    if(description) product._description = description;
    if(price) product._price = price;
    if(quantity) product._quantity = quantity;
    if(category) product._category = category;
    
    Product.findOneAndUpdate({"_id":id}, product)
            .then(obj => res.status(200).json({
                message:`Producto actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el producto con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Product.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Producto eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el producto con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
