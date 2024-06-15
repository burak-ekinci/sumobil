const router = require("express").Router()
const OrderController = require("../controllers/orderController")

router.get("/getorder", OrderController.getOrder)
router.post("/getmyorder", OrderController.getMyOrder)
router.post("/setorder", OrderController.setOrder)
router.post("/orderdone", OrderController.orderDone)
router.post("/deleteorder", OrderController.deleteOrder)

module.exports = router;