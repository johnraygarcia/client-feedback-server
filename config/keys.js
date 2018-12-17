
// 1Absession! mongo db pass
// absession mongo username

if(process.env.NODE_ENV == "production") {
    module.exports = require('./prod');
} else {
    // We are in development
    module.exports = require('./dev');
}