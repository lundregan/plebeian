const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

class Database {
    constructor() {
        this.sequelize = null;
        this.models = {};

        this.initialize();
    }

    initialize() {
        this.sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: 'database.sqlite',
        });

        this.testConnection();

        this.defineModels();

        // // Define model associations and perform any other initialization tasks

        // // Sync the models with the database
        return this.sequelize.sync();
    }

    async testConnection() {
        try {
            await this.sequelize.authenticate();
            return 'Connection has been established successfully.'
        } catch (error) {
            return `Unable to connect to the database: ${error}`;
        }
    }

    test() {
        console.log('Database test');
    }

    defineModels() {
        // Define your models using Sequelize
        const UserModel = this.sequelize.define('User', {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            crypto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        });

        // Add the models to the models object for easy access
        this.models.User = UserModel;
    }

    getModel(name) {
        if (!this.models[name]) {
            throw new Error(`Model '${name}' not found.`);
        }
        return this.models[name];
    }

    getUser = async (user) => {
        const User = this.getModel('User');
        const userRecord = await User.findOne({ where: { userId: user.id } });
        if (!userRecord) {
            return await User.create({ userId: user.id, username: user.username, crypto: 100 });
        }
        return userRecord;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

module.exports = Database;