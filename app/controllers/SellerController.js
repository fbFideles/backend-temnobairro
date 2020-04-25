const bcrypt = require('bcrypt')

const { Seller } = require('../models')

module.exports = {
    index_all_sellers: async (request, response) => {
        try {
            const index_of_sellers = await Seller.findAll({ attributes: ['id', 'name', 'email'] })
            
            return response.status(200).json(index_of_sellers)
        } 
        catch(error) {
            return response.status(500).json({ message: 'Could not fetch data', error })
        } 
    },
    index_a_seller: async (request, response) => {
        try{
            const seller = await Seller.findOne({
                where: {
                    id: request.params.id
                },
                attributes: ['id', 'name', 'email', 'phone']
            })
    
            return response.json(seller)
        }
        catch(error) {
            response.status(500).json({ message: 'Could not fetch data', error })
        }
    },
    create_a_seller: async (request, response) => {
        await bcrypt.hash(request.body.password, 10, (error, hash) => {
            if(error) {
                return response.status(500).json({ message: 'Encryptation error!' })
            }

            const database_seller = {
                name:     request.body.name,
                email:    request.body.email,
                phone:    request.body.phone,
                password: hash
            }

            Seller.create(database_seller)
                .then(() => response.status(200).json(database_seller))
                .catch(error => response.status(500).json({ message: 'Could not create user m8', error }))
        })
    },
    update_a_seller: async(request, response) => {
        try {
            const deprecated_seller = await Seller.findOne( { 
                where: request.params.id,
                attributes: ['id', 'name', 'email', 'phone', 'password'] 
            })
            
            const updated_seller = {
                name:  request.body.name  || deprecated_seller.name,
                email: request.body.email || deprecated_seller.email,
                phone: request.body.phone || deprecated_seller.phone,
                password: request.body.password
            }
            await deprecated_seller.update(updated_seller, { 
                where: { id: request.params.id } 
            })

            return response.status(200).json({ message: 'User updated', updated_seller })
        }   
        catch(error) {
            response.status(500).json({ message: 'Could not update m8, sorry', error })
        }
    },
    delete_a_seller: async (request, response) => {
        try {
            await Seller.destroy({ where: { id: request.params.id } })
            
            return response.status(200).json({ message: 'Seller is gone' })
        }
        catch(error) {
            return response.status(400).json({ message: 'Could not delete this one m8', error })
        }
    }
}
