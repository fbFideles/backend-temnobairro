const { Commerce, Seller } = require('../models')
const status = require('http-status-codes');

module.exports = {
    index_all_commerces: async (request, response) => {
        try {
            const index_of_commerces = await Commerce.findAll({
                attributes: [
                    'id', 'id_seller', 
                    'name', 'category', 
                    'zipcode', 'street',
                    'city', 'state',     
                    'number', 'neighborhood',
                    'complement', 'open_hours',
                    'open_days'
                ],
                include: {
                  model: Seller,
                  attributes: ['name', 'email', 'phone']
                }
            })
            return response.status(status.OK).json(index_of_commerces)
        } 
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        } 
    },
    index_a_commerce: async (request, response) => {
        try{
            const commerce = await Commerce.findOne({
                where: {
                    id: request.params.id 
                },
                attributes: [
                    'id', 'id_seller', 
                    'name', 'category', 
                    'zipcode', 'street',
                    'city', 'state',     
                    'number', 'neighborhood',
                    'complement', 'open_hours',
                    'open_days'
                ],
                include: {
                  model: Seller,
                  attributes: ['name', 'email', 'phone']
                }
            })
            return response.status(status.OK).json(commerce)
        }
        catch(error) {
            response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        }
    },
    index_commerces_by_neighborhood: async (request, response) => {
        try {
            request.params.neighborhood = request.params.neighborhood.toLowerCase()
            const index_of_commerces = await Commerce.findAll({
                where: {
                    neighborhood: request.params.neighborhood
                },
                attributes: [
                    'id', 'id_seller', 
                    'name', 'category', 
                    'zipcode', 'street',
                    'city', 'state',     
                    'number', 'neighborhood',
                    'complement', 'open_hours',
                    'open_days',  
                ],
                include: {
                  model: Seller,
                  attributes: ['name', 'email', 'phone']
                }
            })
            return response.status(status.OK).json(index_of_commerces)
        } 
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        }
    }, 
    index_commerces_by_city: async (request, response) => {
        try {
            request.params.city = request.params.city.toLowerCase()
            const index_of_commerces = await Commerce.findAll({
                where: {
                    city: request.params.city
                },
                attributes: [
                    'id', 'id_seller', 
                    'name', 'category', 
                    'zipcode', 'street',
                    'city', 'state',     
                    'number', 'neighborhood',
                    'complement', 'open_hours',
                    'open_days',  
                ],
                include: {
                  model: Seller,
                  attributes: ['name', 'email', 'phone']
                }
            })
            return response.status(status.OK).json(index_of_commerces)
        } 
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not fetch data', error })
        }
    }, 
    create_a_commerce: async (request, response) => {
        try {
            request.body.neighborhood = request.body.neighborhood.toLowerCase()
            await Commerce.create(request.body)

            return response.status(status.CREATED).json(request.body)
        }
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not create commerce', error })
        }
    },
    update_a_commerce: async(request, response) => {
        try {
            const deprecated_commerce = await Commerce.findOne( { 
                where: { id: request.params.id },
                attributes: [
                    'id', 'id_seller', 
                    'name', 'category', 
                    'zipcode', 'street',     
                    'number', 'neighborhood',
                    'complement', 'open_days'
                ] 
            })

            if (!deprecated_commerce) {
                throw new Error({ name: 'Commerce not found', message: 'Could not find the commerce with the requested ID.' })
            }
            
            const updated_commerce = {
                id_seller:    request.body.id_seller    || deprecated_commerce.id_seller,
                name:         request.body.name         || deprecated_commerce.name,
                category:     request.body.category     || deprecated_commerce.category,
                zipcode:      request.body.zipcode      || deprecated_commerce.zipcode,
                street:       request.body.street       || deprecated_commerce.street,
                number:       request.body.number       || deprecated_commerce.number,
                neighborhood: request.body.neighborhood || deprecated_commerce.neighborhood, 
                complement:   request.body.complement   || deprecated_commerce.complement,
                open_days:    request.body.open_days    || deprecated_commerce.open_days
            }

            const updated = await deprecated_commerce.update(updated_commerce);

            if (updated) return response.status(status.OK).json({ message: 'commerce updated', updated_commerce })
        }   
        catch (error) 
        {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not update m8, sorry', error })
        }
    },
    delete_a_commece: async (request, response) => {
        try {
            await Commerce.destroy({ where: { id: request.params.id } })
            
            return response.status(status.GONE).json({ message: 'Commerce is gone' })
        }
        catch(error) {
            return response.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Could not delete this one m8', error })
        }
   }
}
