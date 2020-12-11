
const {validationResult} = require ('express-validator')
const {response , request} = require('express')


const validatorEvent = (req = request , res = response , next) => {

    const error = validationResult(req)

    if(!error.isEmpty()) {
        return res.json({
            ok : false,
            msg : error.mapped()
        })
    }

    next()

}

module.exports={
    validatorEvent
}