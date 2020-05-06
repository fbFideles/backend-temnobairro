const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Seller } = require('../models')
 
module.exports = {
  register: async (request, response) => {
    if(!request.body.password) return response.status(500).json({ error: "password missing" })
    
    await bcrypt.hash(request.body.password, 10, (error, hash) => {
        if(error) {
            return response.status(500).json({ message: 'Encryptation error!' })
        }

        const database_seller = {
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            password: hash
        }

        Seller.create(database_seller).then(() => {
          database_seller.password = undefined
              
          response.status(200).json(database_seller)
        })
        .catch(error => response.status(500).json({ message: 'Could not create user m8', error }))
      })
  },
  authenticate: async (request, response) => {
    const { email, password } = request.body

    try {
      const seller = await Seller.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'phone', 'password']
      })
      
      if(!seller) {
        return response.status(400).json({ error: 'User not found' })
      }
        
      if(! await bcrypt.compare(password, seller.password)) {
        return response.status(400).json({ error: 'Invalid password' })
      } 

      seller.password = undefined

      const token = jwt.sign({ id: seller.id }, "5bf40166a4e755b78b65c778d22026e4", {
        expiresIn: 86400
      })

      return response.status(200).json({ seller, token })
    }
    catch(error) {
      return response.status(400).json(error)
    }
  }
}