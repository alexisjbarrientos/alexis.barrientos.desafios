import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import __dirname from './utils.js'
import ProductManager from './class/productManager.js'
import routerP from './router/products.router.js'
import routerC from './router/carts.router.js'
import routerV from './router/view.router.js'
import routerS from './router/session.router.js'

dotenv.config()
console.log(process.env.MONGO_URL)
const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`El servidor está funcionando correctamente en el puerto ${PORT}`);
})

app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}))
const manager = new ProductManager(__dirname + '/dataBase/Productos.json')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Rutas

app.use('/', routerV)
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/api/sessions', routerS)

// Socket
const io = new Server(httpServer)

io.on('connection', async (socket) => {
    console.log("Client connected with id", socket.id)
    try {
        const productList = await manager.readProducts()
        socket.emit("productView", productList)
    } catch (error) {
        console.error("Error al obtener los productos:", error)
    }

    socket.on('addProduct', async (productData) => {
        try {
            await manager.addProduct(productData)
            const updatedProductList = await manager.readProducts()
            socket.emit("productView", updatedProductList);
        } catch (error) {
            console.error("Error al agregar el producto:", error)
        }
    })

    socket.on('deleteProduct', async (productId) => {
        try {
            await manager.deleteProduct(productId)
            const updatedProductList = await manager.readProducts()
            socket.emit("productView", updatedProductList)
        } catch (error) {
            console.error("Error al eliminar el producto:", error)
        }
    })
})

