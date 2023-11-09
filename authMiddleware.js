const Auth = require('./auth');
const User = require('./models/user');
const Role = require('./models/role');

const authMiddleware = (source, typePermissions) => async (req, res, next) => {
    const authService = new Auth();
    let userPayload = authService.check(req.get('Authorization').split(' ')[1]);
    const user = await User.findById(userPayload.data);
    const role = await Role.findOne({_name:user._role});
    if(role.permissions.find((elm) => elm.resource === source).permissions.includes(typePermissions)){
        next();
    } else {
        res.status(401).json({
            message: "No autorizado",
            obj:null
        });
    }
}

module.exports = authMiddleware;
    