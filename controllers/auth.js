const {request , response, } = require('express')
const bcrypt = require('bcrypt');
const Users = require('../model/Users');
const {generalToken} = require('../helpers/jwt')

const createUser = async (req = request , res = response) => {
    try {
    const {email , password} = req.body
    let user = await Users.findOne({email})

    if(user) {
        return res.status(400).json({
            ok : false,
            mgs : 'Email alredy user'
        })
    }

    user = new Users(req.body)

    const salt = bcrypt.genSaltSync()
    user.password =  bcrypt.hashSync(password , salt)

    const token = await generalToken(user.id , user.name)

    await user.save()
    
    res.status(200).json({
        ok : true,
        uuid :user.id,
        name : user.name,
        token 
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
    }
}


const loginUser = async (req = request , res = response) => {
    
    try {
        const {email , password } = req.body

        const user = await Users.findOne({email})
    
        if(!user) {
            return res.status(401).json({
                ok : false,
                mgs : 'Email no register'
            })
        } 
        
        const validaPassword = bcrypt.compareSync(password , user.password )

        if(!validaPassword) {
            return res.status(401).json({
                ok : false,
                mgs : 'Password incorret'
            })
        }

        const token = await generalToken(user.id , user.name)

        res.status(200).json({
            ok : true,
            uuid : user.id,
            name : user.name,
            token
            
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
    }
}

const revalidarToken = async (req = request , res = response) => {

    const uuid = req.uuid
    const name = req.name

   try {
    const token = await generalToken(uuid , name)

    res.json({
        ok: true,
        token
    })

   } catch (error) {
       console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
   }

}

module.exports = {
    createUser,
    loginUser,
    revalidarToken
}
