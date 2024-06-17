const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserRouter = require("./routers/userRouter")
const ProductRouter = require("./routers/productRouter")
const OrderRouter = require("./routers/orderRouter")
const { Server } = require('socket.io');
const http = require("http")
const dotenv = require("dotenv").config()

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://sumobil.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
  }
});

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

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log("DB connection is done"))
.catch(err => console.log(err))

app.use("/user", UserRouter)
app.use("/product", ProductRouter)
 app.use("/order", OrderRouter)

 const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`The server is up from port ${PORT}!`)
})

