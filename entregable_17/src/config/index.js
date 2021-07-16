module.exports = {
    database: {
        url: 'mongodb://172.27.31.170:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    app: {
        PUERTO: 8080
    }
}