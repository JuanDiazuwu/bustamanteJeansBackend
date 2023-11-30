const express = require('express');
const Catalog = require('../models/catalog')
const Product = require('../models/product');

async function create(req, res, next){
    const productsId = req.body.productsId;

    let product = await Product.find({ "_id": { $in: productsId }});

    let catalog = new Catalog({
        _products:product
    });
    catalog.save().then(obj => res.status(200).json({
        message: "Catalogo almacenado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo crear el catalogo",
        obj:ex
    }));
}

function list(req, res, next) {
    Catalog.find().then(objs => res.status(200).json({
        message:"Lista de catalogos",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de catalogos",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Catalog.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Catalogo con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el catalogo con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let productsId = req.body.productsId ? req.body.productsId : "";
    let catalog = new Object({
        _products:productsId
    });
    Catalog.findOneAndUpdate({"_id":id}, catalog, {new:true})
            .then(obj => res.status(200).json({
                message:`Catalogo reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el catalogo con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let productsId = req.body.productsId;
    let catalog = new Object();
    if(productsId) catalog._products = productsId;
    Catalog.findOneAndUpdate({"_id":id}, catalog)
            .then(obj => res.status(200).json({
                message:`Catalogo actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el catalogo con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Catalog.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Catalogo eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el catalogo con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};