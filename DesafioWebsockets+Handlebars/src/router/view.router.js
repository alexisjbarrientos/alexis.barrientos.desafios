import {Router} from 'express'
import ProductsManager from '../class/productManager.js'
import  __dirname  from '../utils.js'

const produManager = new ProductsManager(__dirname + '/dataBase/Productos.json')
const routerV = Router()

routerV.get("/", async (req, res) => {
    const listProducts = await produManager.getProducts()
    res.render("home",{listProducts})
})

routerV.get("/realtimeproducts", (req,res) =>  {
    res.render("realTimeProducts")
})

export default routerV