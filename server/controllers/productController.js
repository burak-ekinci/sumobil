const Product = require("../models/productModel")



const setProduct = async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        stock: req.body.stock
    })
   await newProduct.save()
    .then(_ => {
        return res.json({valid: true, message: "Ürün eklendi!"})
    }).catch(err => {
        res.json({valid: false, message: `Ürün eklenemedi: ${err}`})
    })
    
}

const getProduct = async (req, res) => {
    const products = await Product.find();
    return res.json({products})
}

const deleteProduct = async(req, res) => {
    const productId = req.body._id;
    try {
        const response = await Product.findOneAndDelete({_id: productId})
        res.json({valid: true, message: "Ürün silindi!"})
    } catch (error) {
        res.json({valid: false, error})
    }
}

const updateProductStock = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.body.id, { $set: {stock: req.body.stock}}, {new: true})
        res.json({valid: true, message: "Ürün stoğu güncellendi!"})
    } catch (error) {
        res.json({valid: false ,error})
    }
    
}

const updateProductPrice = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.body.id, { $set: {price: req.body.price}}, {new: true})
        res.json({valid: true, message: "Ürün fiyatı güncellendi!"})
    } catch (error) {
        res.json({valid: false, error})
    }

}

module.exports = {
    getProduct,
    setProduct,
    deleteProduct,
    updateProductPrice,
    updateProductStock
}