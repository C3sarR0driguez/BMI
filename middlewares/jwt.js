var express = require('express');
var router = express.Router();
const User = require('../models/user');
const auth = require('../auth');


class jwtMiddleware{
    decodeToken(req,res,next){
        authorization = req.headers.authorization;
        if(!authorization) res.sendStatus(401);
        if(!authorization.includes('Bearer')) res.sendStatus(401);
        token = authorization.replace('Bearer ', '');
        decodedToken = jwt.verify(token);
        req.jwtToken = this.decodeToken;
        next();
    }
}



module.exports = new jwtMiddleware();