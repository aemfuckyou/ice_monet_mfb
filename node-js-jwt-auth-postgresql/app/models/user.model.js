module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false, // important for DB consistency
            validate: {
                notEmpty: true,
                len: [6, 20]
            }

        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [8, 40]
            }
        }
    });

    return User;
};
