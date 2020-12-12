const {response} = require('express')
const {validationResult} = require ('express-validator')
const { options } = require('../routers/auth')

const validatorUser = (req , res = response , next) => {


    const errors = validationResult(req)
  
  

    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok : false,
            msg : errors.mapped()
        })
    }

    next()
}

module.exports = {
    validatorUser
}