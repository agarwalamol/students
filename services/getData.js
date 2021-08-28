const { models} = require('../models/initSequelize')
const students = require('../models/students')

const Fun = async () => {
    await models.students.findAll()
        .then((ob) => {
            return JSON.stringify(ob, null, 2)
        })
}

module.exports = Fun