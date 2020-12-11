
const jwt = require('jsonwebtoken')


const generalToken = (uuid , name) => {

    return new Promise((resolve , reject) => {

        const payload = {uuid , name}
        
        jwt.sign(payload , process.env.JWT_SECRET ,{
            expiresIn : '5h'
        }, (err , token) => {

            if(err) {
                console.log(err);
                reject ('no se puedo crear el token')
            }

            resolve(token)

        })
    })

}

module.exports={
    generalToken
}