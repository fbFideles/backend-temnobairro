const bcrypt = require('bcrypt')

const { Seller } = require('../models')

module.exports = {
  authenticate: async (request, response) => {
    const { email, password } = request.body

    try {
      const seller = await Seller.findOne({
        where: { email },
        attributes: ['id', 'name', 'email', 'phone', 'password']
      })

      if(!seller) throw new Error({ error: "User not found" })
      
      if(!await bcrypt.compare(password, seller.password)) {
        throw new Error({ error: "Invalid password" })
      }
      
      seller.password = undefined

      return response.status(200).json(seller)
    }
    catch(error) {
      return response.status(500).json(error)
    }
  }
}