/**@description This file loads the environmnet variables */

const dotenv = require('dotenv');
let result="";

if (process.env.NODE_ENV === 'production') {
    result = dotenv.config({path: __dirname + '/.env'})
}

else{
    result = dotenv.config({path: __dirname + '/.local.env'})
}

if (result.error) {
    throw result.error
}

/**@exports result.parsed combines all the environmnet variables into an object*/
module.exports = result.parsed