const express = require('express');
const Layaway = require('../models/layaway');
const Client = require('../models/user');
const Product = require('../models/product');

async function create(req, res, next){
    const clientId = req.body.clientId;
    const productsId = req.body.productsId;
    const state = req.body.state;
    const startDate = req.body.startDate;
    const endingDate = req.body.endingDate;

    let client = await Client.findOne({ "_id": clientId});
    let products = await Product.find({ "_id": { $in: productsId }});
    let layaway = new Layaway({
        client:client, products:products, state:state, 
        startDate:startDate, endingDate:endingDate
    });

    layaway.save().then(obj => res.status(200).json({
        message: "Apartado almacenado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo crear el apartar",
        obj:ex
    }));
}   

function list(req, res, next) {
    Layaway.find().then(objs => res.status(200).json({
        message: "Lista de apartados",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se puedo obtener la lista de apartados",
        obj:ex
    }));

}

function index(req, res, next){
    const id = req.params.id;
    Layaway.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Apartado con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el apartado con el id: ${id}`,
        obj:ex
    }));

}

function replace(req, res, next){
    const id = req.params.id;
    let clientId = req.body.clientId ? req.body.clientId : "";
    let productsId = req.body.productsId ? req.body.productsId : "";
    let state = req.body.state ? req.body.state : "";
    let startDate = req.body.startDate ? req.body.startDate : "";
    let endingDate = req.body.endingDate ? req.body.endingDate : "";
    let layaway = new Object({
        _client:clientId, _products:productsId, _state:state,
        _startDate:startDate, _endingDate:endingDate
    });
    Layaway.findOneAndUpdate({"_id":id}, layaway, {new:true})
            .then(obj => res.status(200).json({
                message:`Apartado reemplazada correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar la apartado con el id: ${id}`,
                obj:ex
            }));

}

function update(req, res, next){
    const id = req.params.id;
    let clientId = req.body.clientId;
    let productId = req.body.productId;
    let state = req.body.state;
    let startDate = req.body.startDate;
    let endingDate = req.body.endingDate;
    let layaway = new Object();
    if(clientId) layaway._client = clientId;
    if(productId) layaway._products = productId;
    if(state) layaway._state = state;
    if(startDate) layaway._startDate = startDate;
    if(endingDate) layaway._endingDate = endingDate;
    Layaway.findOneAndUpdate({"_id":id}, layaway)
            .then(obj => res.status(200).json({
                message:`Apartado actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el apartado con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Layaway.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Apartado eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el apartado con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};