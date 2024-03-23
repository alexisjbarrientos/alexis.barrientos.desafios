class ProductoManager {
    constructor(){
        this.productos = []
    }
    agregarProductos(title,description,price,thumbnail,code,stock){
        //Validar campos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error ("Todos los campos son obligatorios")
            return
        }
        //Validar producto
        const productoExistente =this.productos.find(producto=>producto.code === code)
        if (productoExistente) {
            console.error(" el producto ya eexiste.")
            return
        } 
        
        const productos_id = this.productos.length + 1
        const newProductos ={
            id:productos_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.productos.push(newProductos)
        console.log("producto agregado correctamente.")
    }
    getProductos(){
        return this.productos
    }
    getProductoPorId(id){
        const producto = this.productos.find(producto =>producto.id === id)

        if (producto) {
            return producto
        }
        else{
            console.error("Producto no encontrado.")
        }
    }
}
//Agregar productos
const productoManager = new ProductoManager()

productoManager.agregarProductos("Producto prueba","Este es uin producto prueva",200,"sin imagen","abc123",25)
productoManager.agregarProductos("Producto prueba2","Este es uin producto prueva2",2200,"sin imagen2","abc1232",22)
//ver productos 
const productos = productoManager.getProductos()
console.log(productos)