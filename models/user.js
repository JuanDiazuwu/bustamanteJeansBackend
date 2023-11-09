const mongoose = require('mongoose');

const enumUser = ['admin', 'member'];

const schema = mongoose.Schema({
    _name:String,
    _lastName:String,
    _email:String,
    _password:String,
    _salt:String,
    _role: {
        type:String,
        enum: enumUser
    }
})

class User {
    constructor(name, lastName, email, password, salt, role){
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._role = role;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get lastName() { return this._lastName; } 
    set lastName(v) { this._lastName = v; }

    get email() { return this._email; }
    set email(v) { this._email = v; }

    get password() {return this._password; }
    set password(v) {this._password = v; }

    get salt() { return this._salt; }
    set salt(v) { this._salt = v; }

    get role() { return this._role; }
    set role(v) { this._role = v; }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);
