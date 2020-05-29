const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Seller } = require('../models')
const status = require('http-status-codes');
 
module.exports = {
  register: async (request, response) => {
    if(!request.body.password) {
        return response.status(status.INTERNAL_SERVER_ERROR).json({ error: "password missing" })
    }
    
    await bcrypt.hash(request.body.password, 10, (error, hash) => {
        if(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Encryptation error!' })
        }

        const database_seller = {
            name: request.body.name,
            email: request.body.email,
            phone: request.body.phone,
            password: hash
        }

        Seller.create(database_seller).then(() => {
          database_seller.password = undefined
              
          return response.status(status.CREATED).json(database_seller)
        })
        .catch((error) => {
            const [ ValidationErrorItem ] = error.errors
            
            if(ValidationErrorItem.type === 'unique violation') {
                return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'User already exists' })
            } else {
                return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not create user m8', error })    
            }
        })
      })
  },
  authenticate: async (request, response) => {
    const { email, password } = request.body

    try {
      const seller = await Seller.findOne({ where: email })
      
      if(!seller) {
        return response.status(status.BAD_REQUEST).json({ error: 'User not found' })
      }
        
      if(! await bcrypt.compare(password, seller.password)) {
        return response.status(status.BAD_REQUEST).json({ error: 'Invalid password' })
      } 

      seller.password = undefined

      const token = jwt.sign({ id: seller.id }, process.env.AUTH_HASH, {
        expiresIn: 86400
      })

      return response.status(status.OK).json({ seller, token })
    }
    catch(error) {
      return response.status(status.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}