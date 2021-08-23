const {Sequelize} = require ('sequelize')
const initModels = require('./init-models')
const config = require('../config/config')
const env = 'development'
const params = config[env]
const options = params.options

const sequelize = new Sequelize(
    params.database,
    params.user,
    params.password,
    options
)

const models = initModels(sequelize);
module.exports = {models: models , sequelize : sequelize}