const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _permissions:[{
        resource:String,
        permissions:{type:[String]}
    }]
});

class Role {
    constructor(name, permissions){
        this._name = name;
        this._permissions = permissions;
    }

    get name(){ return this._name; }
    set name(v){ this._name = v; }

    get permissions(){ return this._permissions; }
    set permissions(v){this._permissions = v; }
}

schema.loadClass(Role);
module.exports = mongoose.model('Role', schema);
