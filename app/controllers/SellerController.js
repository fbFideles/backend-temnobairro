const { Seller, Commerce } = require('../models')

const status = require('http-status-codes');

module.exports = {
    index_all_sellers: async (request, response) => {
        try {
            const index_of_sellers = await Seller.findAll({
                attributes: [
                    'id', 'name', 
                    'email', 'phone'
                ],
                include: {
                    model: Commerce,
                    attributes: [
                        'id', 
                        'name', 'category', 
                        'zipcode', 'street',
                        'city', 'state',    
                        'number', 'neighborhood',
                        'complement', 'open_days'
                    ]
                },
            })
            return response.status(status.OK).json(index_of_sellers)
        } 
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        } 
    },
    index_a_seller: async (request, response) => {
        try{
            const seller = await Seller.findOne({
                where: {
                    id: request.params.id
                },
                attributes: [
                    'id', 'name', 
                    'email', 'phone'
                ],
                include: {
                    model: Commerce,
                    attributes: [
                        'id', 
                        'name', 'category', 
                        'zipcode', 'street',
                        'city', 'state',     
                        'number', 'neighborhood',
                        'complement', 'open_days'
                    ],
                },
            })

            if (seller === null) {
                throw new Error({ name: 'Seller not found', message: 'Could not find the seller with the requested ID.' })
            }

            return response.status(status.OK).json(seller)
        }
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        }
    },
    update_a_seller: async(request, response) => {
        try {
            const deprecated_seller = await Seller.findOne( { 
                where: { id: request.params.id },
                attributes: ['id', 'name', 'email', 'phone', 'password'] 
            })

            if (!deprecated_seller) {
                throw new Error({ name: 'Seller not found', message: 'Could not find the seller with the requested ID.' })
            }
            
            const updated_seller = {
                name:  request.body.name  || deprecated_seller.name,
                email: request.body.email || deprecated_seller.email,
                phone: request.body.phone || deprecated_seller.phone,
                password: deprecated_seller.password
            }
            await deprecated_seller.update(updated_seller)

            updated_seller.password = undefined
            return response.status(status.OK).json({ message: 'User updated', updated_seller })
        }   
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not update m8, sorry', error })
        }
    },
    delete_a_seller: async (request, response) => {
        try {
            await Seller.destroy({ where: { id: request.params.id } })
            
            return response.status(status.GONE).json({ message: 'Seller is gone' })
        }
        catch(error) {
            return response.status(status.BAD_REQUEST).json({ message: 'Could not delete this one m8', error })
        }
    }
}
