const express = require('express');
const Inventory = require('../models/inventory')
const Product = require('../models/product');

async function create(req, res, next){
    const productsId = req.body.productsId;

    let product = await Product.find({ "_id": { $in: productsId }});

    let inventory = new Inventory({
        product:product
    });
    inventory.save().then(obj => res.status(200).json({
        message: "Inventario almacenado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo crear el inventario",
        obj:ex
    }));
}

function list(req, res, next) {
    Inventory.find().then(objs => res.status(200).json({
        message:"Lista de inventario",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la lista de inventarios",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Inventory.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Inventario con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se pudo consultar el inventario con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let productsId = req.body.productsId ? req.body.productsId : "";
    let inventory = new Object({
        _products:productsId
    });
    Inventory.findOneAndUpdate({"_id":id}, inventory, {new:true})
            .then(obj => res.status(200).json({
                message:`Inventario reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el inventario con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let productsId = req.body.productsId;
    let inventory = new Object();
    if(productsId) inventory._products = productsId;
    Inventory.findOneAndUpdate({"_id":id}, inventory)
            .then(obj => res.status(200).json({
                message:`Inventario actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el inventario con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Inventory.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Inventario eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el inventario con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};