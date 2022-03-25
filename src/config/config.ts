export default {
    development: {
        postgres: {
            database: process.env.DEV_DATABASE as string,
            username: process.env.DEV_USERNAME as string,
            password: process.env.DEV_PASSWORD as string,
            host: process.env.DEV_LOCALHOST as string,
            dialect: process.env.DEV_DIALECT
        }
    },
    production: {
        postgres: {
            database: process.env.PROD_DATABASE as string,
            username: process.env.USERNAME as string,
            password: process.env.PASSWORD as string,
            host: process.env.HOST as string,
            dialect: process.env.DIALECT
        }
    }
}