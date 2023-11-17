const mongoose = require('mongoose');

const enumUser = ['admin', 'member'];

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _userName:String,
    _email:String,
    _password:String,
    _salt:String,
    _phone:String,
    _role: {
        type:String,
        enum: enumUser
    },
    _address: {
        street: String,
        number: String,
        zip: Number,
        city: String,
        state: String,
        country: String
    } 
});

class User {
    constructor(name, lastName, userName, email, password, salt, phone, role, address){
        this._name = name;
        this._lastName = lastName;
        this._userName = userName;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._phone = phone;
        this._role = role;
        this._address = address;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get lastName() { return this._lastName; } 
    set lastName(v) { this._lastName = v; }

    get userName() { return this._userName; }
    set userName(v) { this._userName = v; }

    get email() { return this._email; }
    set email(v) { this._email = v; }

    get password() {return this._password; }
    set password(v) {this._password = v; }

    get salt() { return this._salt; }
    set salt(v) { this._salt = v; }

    get phone() { return this._phone; }
    set phone(v) { this._phone = v; }

    get role() { return this._role; }
    set role(v) { this._role = v; }

    get address() { return this._address; }
    set address(v) { this._address = v; }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);
