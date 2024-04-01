const productoManager = require('./productmanager.js')

const manager = new productoManager()

// agregar productos

manager.agregaarProductos({
    title: "Producto A",
    description: "Descripción del producto A",
    price: 10.99,
    thumbnail: 'ruta/imagenA.jpg',
    code: 'P001',
    stock: 5
})

manager.agregaarProductos({
    title: "Producto b",
    description: "Descripción del producto b",
    price: 11.99,
    thumbnail: 'ruta/imagenb.jpg',
    code: 'P002',
    stock: 5
})
manager.agregaarProductos({
    title: "Producto b",
    description: "s",
    price: 11.99,
    thumbnail: 'ruta/imagenb.jpg',
    code: 'P002',
    stock: 5
})
manager.agregaarProductos({
    title: "Producto b",
    description: "",
    price: 11.99,
    thumbnail: 'ruta/imagenb.jpg',
    code: '',
    stock: 5
})


// obtener productos

manager.obtenerProducto()

// obtener Producto por id

manager.obtenerProductosPorId(1)

// Actualizar producto

manager.actualizarProducto(2, {
    title: 'Producto b',
    description: 'Descripción del producto b',
    price: 12.99,
    thumbnail: 'ruta/imagenb.jpg',
    code: 'P002',
    stock: 7
})

// Eliminar Productos

manager.eliminarProducto(1)