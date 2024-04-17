const express =require('express')
const productoManager = require('./productmanager.js')
const app = express ()
const PORT = 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const productosManager = new productoManager()
app.get('/productos', async (req, res) => {
    try {
        let productos = await productosManager.leerProductos();
        
        if (req.query.limite) {
            const limite = parseInt(req.query.limite);
            productos = productos.slice(0, limite);
        }
        
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/productos/:pid', async (req, res) => {
    try {
        const productoId = parseInt(req.params.pid);
        const producto = await productosManager.obtenerProductosPorId(productoId);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(PORT,()=>{
    console.log(`server cargado correctamente en el puerto ${PORT}`)
})

