const Operation = require('../models/Operation')

const operationController = {
    addOperation : async ( req, res) => {
        const {concept, amount, date, category, type, userId} = req.body
        const operationAdd = new Operation({ concept, amount, date, category, type, userId})
        
        operationAdd.save()
        .then(async operationAdd=> {
            const opAdd = await operationAdd.populate('userId').execPopulate()
            return res.json({success: true, respuesta: opAdd})
        })
        .catch(error => {
          return res.json({success: false, error: error})
        })
    },
    allOperations: (req, res) => {
        Operation.find()
        .then(data => {
          return res.json({success: true, respuesta: data})
        })
        .catch(error => {
          return res.json({success: false, error: error})
        })
    },
    modOperation: (req, res) => {
      const {concept, amount, date, category, content, id} = req.body

      Operation.findOneAndUpdate({_id: id}, {concept, amount, date, category, content}, {new: true})
      .then(operation => {
        console.log(operation)
        return res.json({success: true, respuesta: operation})
      })
      .catch(error => {
        console.log(error)
        return res.json({success: false, error: error})
      })
    },
    deleteOperation: async (req, res) => {
        try {
            const {id} = req.body
            await Operation.findOneAndDelete({ _id: id })
            const response = await Operation.find()
            res.json({
              success: true,
              response
            })
          } catch (error) {
            res.json({
              success: false,
              error
            })
          }
      
    }
}
module.exports = operationController