const fs = require('fs');
const config = require('config');

const sslOptions = {
    key: fs.readFileSync(config.get('ssl.key')),
    cert: fs.readFileSync(config.get('ssl.cert')),
};




module.exports = {
    sslOptions
}