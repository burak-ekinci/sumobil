const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getOrder = async (req,res) => {
  const orders = await Order.find();
    return res.json({orders})
}

const getMyOrder = async (req,res) => {
  const orders = await Order.find({"user.phone": req.body.phone});
    return res.json({orders})
}

const setOrder = async (req,res) => {
 try {
    const orderDetail = req.body;
    const productInfo = await Product.findOne({_id: orderDetail.product})
    const userInfo = await User.findOne({_id: orderDetail.user})
    const order = new Order({
      user: {
        fullName: userInfo.fullName,
        phone: userInfo.phone,
        address: userInfo.address,
        role: userInfo.role
      },
      product: {
        name: productInfo.name,
        imgUrl: productInfo.imgUrl,
        price: productInfo.price
      },
      amount: orderDetail.amount,
      totalPrice: orderDetail.totalPrice,
      status: orderDetail.status // Enum değerlerinden biri olmalı
    });
    await order.save()
    return res.status(201).json({ message: 'Siparişiniz alındı: ' });

    // Firma sahibine gerçek zamanlı bildirim gönder
    // io.emit('newOrder', { order });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const orderDone = (req,res) => {

}

const deleteOrder = async (req,res) => {
  const deletedOrderId = req.body._id;
  try {
    await Order.findOneAndDelete({_id: deletedOrderId})
    res.json({message: "Sipariş silindi"})
  } catch (error) {
    res.json({error: error.message})
  }
}

module.exports = {
    getOrder,
    setOrder,
    orderDone,
    deleteOrder,
    getMyOrder
}

