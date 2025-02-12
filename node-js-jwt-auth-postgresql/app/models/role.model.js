/**
 * @typedef {import("sequelize").Model} Model
 * @typedef {import("sequelize").Sequelize} Sequelize
 */

module.exports = (sequelize, Sequelize) => {
    /**
     * @extends {Model}
     */
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Role;
};
