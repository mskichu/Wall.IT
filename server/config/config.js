var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/costs',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://appharbor_s9kmmh6z:30pucvca0cl8bjqjhlbd7sm26l@ds155747.mlab.com:55747/appharbor_s9kmmh6z',
        port: process.env.PORT || 3030
    }
};
