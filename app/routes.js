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
router.get('/api/v1/commerce/:id', CommerceController.index_a_commerce)
router.post('/api/v1/commerce', CommerceController.create_a_commerce)
router.delete('/api/v1/commerce/:id', CommerceController.delete_a_commerce)
router.put('/api/v1/commerce/:id', CommerceController.update_a_commerce)

module.exports = router