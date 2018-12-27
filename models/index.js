/**
 * Created by Walter Suazo on 26/10/2015.
 */
var Sequelize= require('Sequelize');
var env="dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

var sequelize = new Sequelize(config.database, config.user, config.password, {
    logging: console.log,
    define: {
        timestamps: false
    },
    host: '131.161.52.171',
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        idle: 1000
    },
});
var crypto = require('crypto');
var DataTypes = require("sequelize");

var models = [
    'Unidades',
    'Posiciones'
];

models.forEach(function(mdel){
    module.exports[model]=sequelize.import(__dirname + '/' + model);
});

(function (m) {

})(module.exports);

module.exports.sequelize=sequelize;