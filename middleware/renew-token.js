const {request , response} = require('express')
const jwt = require('jsonwebtoken')

const renewToken = (req = request , res = response , next) => {

    const token = req.header('x-token')


    if(!token) {
        res.status(401).json({
            ok:false,
            msg: 'no hay token'
        })
    }

    try {

        const {uuid , name} = jwt.verify(token , process.env.JWT_SECRET)
        req.uuid = uuid,
        req.name = name
        
    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'token no valido'
        })
    }
    
    next()
}

module.exports = {
    renewToken
}