const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
   try {
       // Create new User
       const user = await User.create({
           username: req.body.username,
           email: req.body.email,
           password: bcrypt.hashSync(req.body.password, 8)
       });

       if (req.body.roles && req.body.roles.length > 0) {
           // get all roles from DB
           const roles = await Role.findAll({
               where: {
                   name: {
                       [Op.or] : req.body.roles
                   }
               }
           });
           await user.setRoles(roles);
       } else {
           // Set standard role "user"
           const defaultRole = await Role.findOne({
               where: {
                   name: "user"
               }
           });
           await user.setRoles([defaultRole]);
       }
       res.status(201).send({message: "User created successfully."});
   }catch(err) {
       res.status(500).send({message: err.message});
   }
};

exports.signin = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            return res.status(401).send({message: "User does not exist"});
        }
        // Check passwords
        const pwIsValid = await bcrypt.compare(req.body.password, user.password);
        if (!pwIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }
        // Create JWT-Token
        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400 // 24h
        });
        // Get roles
        const roles = await user.getRoles();
        const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
