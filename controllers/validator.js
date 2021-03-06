const Joi = require("joi")

const validator = {
    register: (req, res, next) => {
        const schema = Joi.object({
            firstName: Joi.string(),
            email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/),
            urlPic: Joi.string().required(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if (!validation.error) {
            next()
        } else {
            res.json({success: false, errores: ['Complete todos lo campos correctamente.']})
        }
    },
    addOperation: (req, res, next) => {
        const schema = Joi.object({
            concept: Joi.string(),
            amount: Joi.number(),
            date: Joi.date(),
            category: Joi.string(),
            type: Joi.string(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if (!validation.error) {
            next()
        } else {
            res.json({success: false, errores: ['Complete todos lo campos correctamente.']})
        }
    }
}

module.exports = validator