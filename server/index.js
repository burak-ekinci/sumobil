const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserRouter = require("./routers/userRouter")
const ProductRouter = require("./routers/productRouter")
const OrderRouter = require("./routers/orderRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/sumobil")
.then(() => console.log("db connection is done"))
.catch(err => console.log(err))

app.use("/user", UserRouter)
app.use("/product", ProductRouter)
app.use("/order", OrderRouter)

app.listen(3000, () => {
    console.log("The server is up from port 3000!")
})

