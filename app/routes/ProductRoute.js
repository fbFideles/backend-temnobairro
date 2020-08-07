const router = require("express").Router();

const ProductController = require("../controllers/ProductController");

router.use(require("../middlewares/authMiddleware"));

router.post("/", SellerController.create_a_product);
router.patch("/:id", ProductController.update_a_product);
router.delete("/:id", ProductController.delete_a_product);
module.exports = router;
