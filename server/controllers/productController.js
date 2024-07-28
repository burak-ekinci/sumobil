const Product = require("../models/productModel")



const setProduct = async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        stock: req.body.stock
    })
    console.log(req.body)
   await newProduct.save()
    .then(_ => {
        return res.json({valid: true, message: "Ürün başarıyla eklendi"})
    }).catch(err => {
        res.json({valid: false, message: `Ürün eklenemedi: ${err}`})
    })
    
}


const getProduct = async (req,res) => {
    const products = await Product.find();
    return res.json({products})
}


const deleteProduct = async(req, res) => {
    const productId = req.body._id;
    try {
        const response = await Product.findOneAndDelete({_id: productId})
        res.json({message: "Ürün başarıyla silindi"})
    } catch (error) {
        res.json({error})
    }
}

module.exports ={
    getProduct,
    setProduct,
    deleteProduct
}