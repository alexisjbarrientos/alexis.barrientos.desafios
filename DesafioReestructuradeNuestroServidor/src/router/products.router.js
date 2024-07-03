import { Router } from "express"
// import ProductManager from "../class/productManager.js" esto era para el fs
import ProductManager from "../class/productsManagerMd.js"
import  __dirname  from '../utils.js'

const routerP = Router ()
const productsManager = new ProductManager()


routerP.get('/', async (req, res) => {
    try {
        let { limit, page, sort, category } = req.query
        console.log(req.originalUrl);
        console.log(req.originalUrl.includes('page'));
  
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 1,
            sort: { price: Number(sort) }
        };
  
        if (!(options.sort.price === -1 || options.sort.price === 1)) {
            delete options.sort
        }
  
  
        const links = (products) => {
            let prevLink;
            let nextLink;
            if (req.originalUrl.includes('page')) {

                prevLink = products.hasPrevPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.prevPage}`) : null;
                nextLink = products.hasNextPage ? req.originalUrl.replace(`page=${products.page}`, `page=${products.nextPage}`) : null;
                return { prevLink, nextLink };
            }
            if (!req.originalUrl.includes('?')) {

                prevLink = products.hasPrevPage ? req.originalUrl.concat(`?page=${products.prevPage}`) : null;
                nextLink = products.hasNextPage ? req.originalUrl.concat(`?page=${products.nextPage}`) : null;
                return { prevLink, nextLink };
            }
            prevLink = products.hasPrevPage ? req.originalUrl.concat(`&page=${products.prevPage}`) : null;
            nextLink = products.hasNextPage ? req.originalUrl.concat(`&page=${products.nextPage}`) : null;
            console.log(prevLink)
            console.log(nextLink)
  
            return { prevLink, nextLink };
  
        }
  //devuelve un array con las caractegoria del los productos
        const catego = await productsManager.cateG()
  
        const result = catego.some(cate => cate === category)
        if (result) {
  
            const products = await productsManager.getProducts({ category }, options);
            const { prevLink, nextLink } = links(products);
            const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
            return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
        }
  
        const products = await productsManager.getProducts({}, options);
        // console.log(products, 'Product');
        const { totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, docs } = products
        const { prevLink, nextLink } = links(products);
        return res.status(200).send({ status: 'success', payload: docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink });
    } catch (err) {
        console.log(err);
    }
  
  
  })

routerP.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productsManager.getProductsId(productId)
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' })
    }
})

routerP.post('/', async (req , res) => {
    try {
        const productData =  req.body
        await productsManager.addProducts(productData)
        res.status (200).json({message: 'Producto agregado correctamente'})
    } catch (error) {
        console.log(error)
        res.status (500).json ({message: 'Error al agregar el producto'})
    }
})

export default routerP
