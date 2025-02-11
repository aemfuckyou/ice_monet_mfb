const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const isDuplicateUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).send({message: "Username and email are required"});
        }

        const userExists = await User.findOne({
            where: { [db.Sequelize.Op.or]: [{username}, {email}] },
        });

        if (userExists) {
            return res.status(400).send({
                message: `Failed! ${userExists.username === username ? "Username" : "Email"} is already in use!`,
            });
        }
        next();
    }catch(err) {
        console.error("Error while trying to check isDuplicateUser", err);
        res.status(500).send({message: "Server Error while trying to check duplicate user"});
    }
};

const validateRoles = (req, res, next) => {
    if (!req.body.roles || req.body.roles.length === 0) return next(); // if there aren´t any roles

    const invalidRoles = req.body.roles.filter(role => !ROLES.includes(role));

    if (invalidRoles.length > 0) {
        return res.status(400).send({
            message: `Failed! Roles do not exist: ${invalidRoles.join(', ')}`,
        });
    }
    next();
};

const verifySignUp = {
    isDuplicateUser : isDuplicateUser,
    validateRoles : validateRoles
};

module.exports = verifySignUp;
