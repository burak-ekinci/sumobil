const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {type: String, require: true},
    imgUrl: {type: String, require: true},
    price: {type: Number, require: true},
    stock: { type: Number, require:true}
}, {timestamps: true})

const Product = mongoose.model("products", ProductSchema)

module.exports = Product;