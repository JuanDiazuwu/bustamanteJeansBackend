const express = require('express');
const Role = require('../models/role');

async function create(req, res, next){
    const name = req.body.name;
    const permissions = req.body.permissions;

    let role = new Role({
        name:name, permissions:permissions    
    }); 
    role.save().then(obj => res.status(200).json({
        message:"Rol creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el rol",
        obj:ex
    }));
}

function list(req, res, next) {
    Role.find().then(objs => res.status(200).json({
        message:"Lista de roles",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de roles",
        obj:ex
    }));
}

function index(req, res, next){
    res.send('Users index')
}

function replace(req, res, next){
    res.send('Users replace')
}

function update(req, res, next){
    res.send('Users update')
}

function destroy(req, res, next){
    const id = req.params.id;
    Role.findByIdAndDelete({"_id":id}).then(obj => res.status(200).json({
        message:`Rol eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el rol con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
