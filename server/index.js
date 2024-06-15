const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserRouter = require("./routers/userRouter")
const ProductRouter = require("./routers/productRouter")
const OrderRouter = require("./routers/orderRouter")
const { Server } = require('socket.io');
const http = require("http")
const OrderController = require("./controllers/orderController")
const Order = require("./models/orderModel")


const app = express()
const server = http.createServer(app);
const io = new Server(server);

global.io = io;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('Firma sahibi bağlandı.');
  
    socket.on('disconnect', () => {
      console.log('Firma sahibi bağlantısı kesildi.');
    });
  });

mongoose.connect("mongodb://127.0.0.1:27017/sumobil")
.then(() => console.log("db connection is done"))
.catch(err => console.log(err))

app.use("/user", UserRouter)
app.use("/product", ProductRouter)
 app.use("/order", OrderRouter)

server.listen(3000, () => {
    console.log("The server is up from port 3000!")
})

