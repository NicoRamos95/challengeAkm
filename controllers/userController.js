const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        const {firstName, password, email, urlPic} = req.body
        var errores = []
        const  userExist = await User.findOne({email: email})
        if (userExist) {
            errores.push('El nombre de usuario ya existe, elige otro')
        }
        if (errores.length === 0) {
            const passHashed = bcryptjs.hashSync(password, 10)
            var newUser = new User({
                firstName, email, urlPic, password: passHashed
            })
            var userSave = await newUser.save()
            var token = jwt.sign({...userSave}, process.env.SECRET_KEY, {})
            
        }
        

        return res.json({success: errores.length === 0 ? true : false, 
                        errores: errores, 
                        response: errores.length === 0 && {token, urlPic: userSave.urlPic, firstName: userSave.firstName, email: userSave.email}}) 
    },

    logIn: async (req, res) => {
        const {email, password} = req.body
        const userExists = await User.findOne({email: email})

        if (!userExists) {
            return res.json({success: false, mensaje: 'Usuario o contraseña es invalida.'})
        }
        const passMatchs = bcryptjs.compareSync(password, userExists.password)
        if (!passMatchs) {
            return res.json({success: false, mensaje: 'Usuario o contraseña es invalida.'})
        }
        
        var token = jwt.sign({...userExists}, process.env.SECRET_KEY, {})
        console.log(userExists)
        return res.json({success: true, response: {token, userExists: userExists.email, urlPic: userExists.urlPic, firstName: userExists.firstName,}}) 
    },
    logLS: (req, res) => {
        res.json({success: true, response: {token: req.body.token, firstName: req.user.firstName, userExists: req.user.userExists, urlPic: req.user.urlPic}}) 
    }

}

module.exports = userController