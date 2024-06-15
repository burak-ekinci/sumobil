const router = require("express").Router()
const ProductController = require("../controllers/productController");


router.post("/setproduct", ProductController.setProduct)
router.get("/getproducts", ProductController.getProduct)
router.post("/deleteproduct", ProductController.deleteProduct)

module.exports = router;