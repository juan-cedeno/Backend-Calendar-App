const express = require('express')
const { createUser, loginUser, revalidarToken } = require('../controllers/auth')
const {check} = require('express-validator')
const {validatorUser} = require('../middleware/validator-user')
const {renewToken} = require('../middleware/renew-token')



const router = express.Router()


router.post('/register' ,
[
    check('name' , 'Name is required').not().isEmpty(),
    check('email' , 'Email is invalid').isEmail(),
    check('password' , 'the password must be at least 6 characters').isLength({min : 6}),
    validatorUser
],
 createUser
)

router.post('/' , 
[
    check('email' , 'Email incorret or unregistered').isEmail(),
    check('password' , 'the password must be at least 6 characters').isLength({min : 6}),
    validatorUser
],
loginUser
)
router.get('/renew', renewToken , revalidarToken)


module.exports = router