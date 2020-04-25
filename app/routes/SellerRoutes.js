const router = require('express').Router()

const SellerController = require('../controllers/SellerController')

router.get('/', SellerController.index_all_sellers)
router.get('/:id', SellerController.index_a_seller)
router.post('/', SellerController.create_a_seller)
router.delete('/:id', SellerController.delete_a_seller)
router.patch('/:id', SellerController.update_a_seller)

module.exports = router