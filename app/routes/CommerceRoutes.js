const router = require('express').Router()

const CommerceController = require('../controllers/CommerceController')

router.get('/', CommerceController.index_all_commerces)
router.get('/', CommerceController.index_a_commerce)
router.post('/', CommerceController.create_a_commerce)
router.delete('/:id', CommerceController.delete_a_commece)
router.patch('/:id', CommerceController.update_a_commerce)

module.exports = router