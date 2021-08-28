module.exports = {
    development: {
        schema: 'public',
        database: 'lxeznhtv',
        user: 'lxeznhtv',
        password: '93X0hMmtUZwOkkq7BdXBwMDz5tN4W1LH',
        options: {
            host: 'john.db.elephantsql.com',
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false,
            seederStorage: 'sequelize'
        }
    }
}