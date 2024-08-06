const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getOrder = async (req,res) => {
  const orders = await Order.aggregate([
    {
      $sort: {
        createdAt: -1 // sorting by creation date
      }
    },
    {
      $group: {
        _id: "$user.phone",
        orders: {
          $push: {
            _id: "$_id",
            user: {
              fullName: "$user.fullName",
              phone: "$user.phone",
              address: "$user.address",
              role: "$user.role"
            },
            product: "$product",
            amount: "$amount",
            totalPrice: "$totalPrice",
            status: "$status",
            orderDate: "$createdAt"
          }
        }
      }
    }
  ]);
  
    return res.json({orders})
}

const getMyOrder = async (req,res) => {
  const orders = await Order.find({"user.phone": req.body.phone});
  
    return res.json({orders})
}

const setOrder = async (req, res) => {
  try {
    const orderDetail = req.body;
    const productInfo = await Product.findOne({ _id: orderDetail.product });

    if (!productInfo) {
      throw new Error("Ürün bulunamadı"); // Eğer ürün bulunamazsa hata fırlatın
    }

    if (productInfo.stock <= 0) {
      throw new Error("Stokta bulunmamaktadır");
    }

    const userInfo = await User.findOne({ _id: orderDetail.user });
    const order = new Order({
      user: {
        _id: orderDetail.user,
        fullName: userInfo.fullName,
        phone: userInfo.phone,
        address: userInfo.address,
        role: userInfo.role,
      },
      product: {
        _id: productInfo._id,
        name: productInfo.name,
        imgUrl: productInfo.imgUrl,
        price: productInfo.price,
      },
      amount: orderDetail.amount,
      totalPrice: orderDetail.totalPrice,
      status: orderDetail.status, // Enum değerlerinden biri olmalı
    });

    await order.save();
    // Firma sahibine gerçek zamanlı bildirim gönder
    global.io.emit("new_order", order); // Yeni sipariş bildirimi gönder
    return res
      .status(201)
      .json({ message: `Siparişiniz alındı: ${orderDetail.amount} tane ${productInfo.name}` });
  } catch (error) {
    return res.json({ error: error.message });
  }
};


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

