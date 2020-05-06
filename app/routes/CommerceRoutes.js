const router = require('express').Router()
const routerGet = require('express').Router()

const CommerceController = require('../controllers/CommerceController')

router.use(require('../middlewares/authMiddleware'))

routerGet.get('/', CommerceController.index_all_commerces)
routerGet.get('/:id', CommerceController.index_a_commerce)

router.post('/', CommerceController.create_a_commerce)
router.delete('/:id', CommerceController.delete_a_commece)
router.patch('/:id', CommerceController.update_a_commerce)

module.exports = {
  router,
  routerGet
}