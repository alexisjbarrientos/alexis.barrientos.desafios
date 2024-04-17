const fs = require(`fs`).promises;

class productoManager {
    constructor(path){
        this.path = path;
        this.productos = [];
    }
   async agregarProductos(producto){
        try {
            // Validar campos
            if (!this.validarCampos(producto)) {
                throw new Error("Todos los campos son obligatorios");
            }
            // validar producto existente
            const productoExistente = this.productos.find(p => p.code === producto.code);
            if(productoExistente){
                return;
            }
            const productos_id = this.productos.length + 1;
            const newProducto = {
                id: productos_id,
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock
            };
            this.productos.push(newProducto);
            await fs.writeFile(this.path, JSON.stringify(this.productos,null,2));
        } catch (error) {            
            console.error("Error al ingresar productos:", error.message);
        }
    }
    validarCampos(producto) {
        return (
            producto.title &&
            producto.description !== "" &&
            producto.price &&
            producto.thumbnail &&
            producto.code &&
            producto.stock !== undefined
        );
    }
    async leerProductos(){
        const data = await fs.readFile(this.path,'utf8');
        return JSON.parse(data);
    }
    
    async obtenerProducto(){
        try {
            const data2 = await this.leerProductos();
            return data2;
        } catch (error) {
            console.error("Error al obtener los productos",error);
        }
    }
    
    async obtenerProductosPorId(id){
        try {
            const data3 = await this.leerProductos();
            const obtenerId = data3.find(producto => producto.id === id);
            return obtenerId;
        } catch (error) {
            console.error("Error al obtener el producto ",error);
        }
    }

    async actualizarProducto(id, ...producto){
        try {
            await this.eliminarProducto(id);
            const data4 = await this.leerProductos();
            const productoActualizado = [{ ...producto, id}, ...data4];
            await fs.writeFile(this.path, JSON.stringify(productoActualizado,null,2)); 
        } catch (error) {
            console.error("Error al actualizar el producto",error);
        }
    }
    async eliminarProducto(id){
        try {
            const data5 = await this.leerProductos();
            const productoEliminado = data5.filter(producto => producto.id !== id);
            await fs.writeFile(this.path, JSON.stringify(productoEliminado,null,2)); 
        } catch (error) {
            console.error("No se pudo eliminar el producto",error);
        }
    }
}

module.exports = productoManager;


module.exports = productoManager;






