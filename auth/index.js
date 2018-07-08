
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('crypto');
const config = require('../config');


function createJWTToken(payload, options = {expiresIn: 86400}) {
    if(typeof(payload === 'object') && !Array.isArray(payload)){
        return jwt.sign(payload,config.secret,options);
     }
     throw new TypeError('Expecting @payload of type Object');
}

function isPasswordValid(passwd){
    return /[A-Z]/.test(passwd) && /\d/.test(passwd);   
}

function hashPassword(passwd){
    return crypto.createHash('md5').update(passwd).digest('hex');
}



module.exports = {
    isPasswordValid,
    createJWTToken,
    hashPassword
}
