const { Commerce } = require('../models')

module.exports = {
    index_all_commerces: async (request, response) => {
        try {
            const index_of_commerces = await Commerce.findAll({ 
                attributes: [
                    'id', 
                    'id_seller', 
                    'name', 
                    'category', 
                    'zipcode', 
                    'street', 
                    'number', 
                    'complement',
                    'open_days'
                ] 
            })
            
            return response.status(200).json(index_of_commerces)
        } 
        catch(error) {
            return response.status(500).json({ message: 'Could not fetch data', error })
        } 
    },
    index_a_commerce: async (request, response) => {
        try{
            const commerce = await Commerce.findOne({
                where: {
                    id: request.params.id 
                },
                attributes: [
                    'id', 
                    'id_seller', 
                    'name', 
                    'category', 
                    'zipcode', 
                    'street', 
                    'number', 
                    'complement',
                    'open_days'
                ] 
            })
    
            return response.status(200).json(commerce)
        }
        catch(error) {
            response.status(500).json({ message: 'Could not fetch data', error })
        }
    },
    create_a_commerce: async (request, response) => {
        try {
            await Commerce.create(request.body)

            return response.status(200).json(request.body)
        }
        catch(error) {
            return response.status(500).json({ message: 'Could not create commerce', error })
        }
    },
    update_a_commerce: async(request, response) => {
        try{
            const deprecated_commerce = await Commerce.findOne( { where: request.params.id } )

            const updated_commerce = {
                name:  request.body.name            || deprecated_commerce.name,
                category: request.body.category     || deprecated_commerce.category,
                zipcode: request.body.zipcode       || deprecated_commerce.zipcode,
                street: request.body.street         || deprecated_commerce.street,
                number: request.body.number         || deprecated_commerce.number,
                complement: request.body.complement || deprecated_commerce.complement,
                open_days: request.body.open_days   || deprecated_commerce.open_days
            }
            await deprecated_commerce.update(updated_commerce)
            return response.status(200).json({ message: 'Commerce updated', updated_commerce })
        }
        catch(error) {
            return response.status(500).json({ message: 'Could not update m8, sorry', error })
        }
    },
    delete_a_commece: async (request, response) => {
        try {
            await Commerce.destroy({ where: { id: request.params.id } })
            return response.status(200).json({ message: 'Commerce is gone' })
        }
        catch(error) {
            return response.status(500).json({ message: 'Could not delete this one m8', error })
        }
   }
}
