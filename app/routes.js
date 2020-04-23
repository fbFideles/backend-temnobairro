const router = require('express').Router()

const SellerController = require('./controllers/SellerController')
const CommerceController = require('./controllers/CommerceController')

// Seller route
router.get('/api/v1/seller', SellerController.index_all_sellers)
router.get('/api/v1/seller/:id', SellerController.index_a_seller)
router.post('/api/v1/seller', SellerController.create_a_seller)
router.delete('/api/v1/seller/:id', SellerController.delete_a_seller)
router.put('/api/v1/seller/:id', SellerController.update_a_seller)

// Commerce route
router.get('/api/v1/commerce', CommerceController.index_all_commerces)

module.exports = router