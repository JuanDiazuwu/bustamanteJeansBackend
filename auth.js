const jwt = require('jsonwebtoken');

class Auth {
    constructor(){
        if(typeof Auth.instance === 'object'){
            return Auth.instance;
        }
        Auth.instance = this;
        return this;
    }
    JwtKey = "57a48587453fd4e544b8e3f2db8d2ca9";

    check(token) {
        return jwt.verify(token, this.JwtKey);
    }
}

module.exports = Auth;
