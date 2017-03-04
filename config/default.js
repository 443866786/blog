/**
 * Created by lithium on 2017-03-03.
 */
module.exports = {
    port: 3002,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/test'
};