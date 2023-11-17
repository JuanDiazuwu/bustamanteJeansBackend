const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    let salt = await bcrypt.genSalt(10);
    const phone = req.body.phone;
    const role = req.body.role;

    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name:name, lastName:lastName, userName:userName,
        email:email, password:passwordHash, salt:salt, 
        phone:phone, role:role, address:address
    }); 
    user.save().then(obj => res.status(200).json({
        message:"Usuario creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el usuario",
        obj:ex
    }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
        message:"Lista de usuarios",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de usuarios",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Usuario con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el usuario con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let userName = req.body.userName ? req.body.userName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";
    let phone = req.body.phone ? req.body.phone : "";
    let role = req.body.role ? req.body.role : "";
    let address = req.body.address ? req.body.address : "";
    let user = new Object({
        _name:name, _lastName:lastName, _userName:userName ,_email:email, 
        _password:password, _phone:phone ,_role:role, _address:address
    });
    User.findOneAndUpdate({"_id":id}, user, {new:true})
            .then(obj => res.status(200).json({
                message:`Usuario reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el usuario con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let role = req.body.role;
    let address = req.body.address;
    let user = new Object();
    if(name) user._name = name;
    if(lastName) user._lastName = lastName;
    if(userName) user._userName = userName;
    if(email) user._email = email;
    if(password) user._password = password;
    if(phone) user._phone = phone;
    if(role) user._role = role;
    if(address) user._address = address;
    User.findOneAndUpdate({"_id":id}, user)
            .then(obj => res.status(200).json({
                message:`Usuario actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el usuario con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Usuario eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el usuario con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
