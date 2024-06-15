const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      fullName: {
          type: String,
          trim: true,
          },
      phone: {
          type: Number,
          trim: true
          },
      address: {
          type: String,
          trim: true
          },
      role: {
          type:String, 
          },

  },
    product: {
      name: {type: String, require: true},
      imgUrl: {type: String, require: true},
      price: {type: Number, require: true},
  },
    amount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
        type: String,
        required: true,
        default: "Beklemede",
        enum: ['Beklemede', 'Yolda', 'Teslim', 'İptal']
     }
  },
  { collection: "orders",timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
