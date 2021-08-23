const sequelizeAuto = require('sequelize-auto')
const Sequelize = require('sequelize')
const path = require('path')
const output = path.join(__dirname, '../models/')
const db = 'lxeznhtv'
const user = 'lxeznhtv'
const password = '93X0hMmtUZwOkkq7BdXBwMDz5tN4W1LH'

const sequelize = new Sequelize(db, user, password,
    {
        host: 'john.db.elephantsql.com',
        dialect: 'postgres',
        dialectOptions:{
            ssl: {
                require: true,
                rejectUnauthorized : false
            }
        }
    })

    const options =
    {
        directory : output,
        singulaize: false,
        additional: {
            timestamps : false
        }
    }

    const auto = new sequelizeAuto(sequelize, null, null, options)
    console.log(auto.run())