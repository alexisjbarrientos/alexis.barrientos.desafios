import {productsModel} from "../models/products.model.js"

class ProductManager{

getProducts = async (filter,options) => {
try {
    //  return await productsModel.find().lean()
    return await productsModel.paginate(filter, options)
} catch (error) {
    console.error("Error al obtener los productos.", error)
}
}

getProductsId = async (id) => {
try {
    return await productsModel.findById(id)
} catch (error) {
    console.error("Error al obtener el producto.", error)
}
}

getProductsView = async () => {
    try {
        return await productsModel.find().lean();

    } catch (err) {
        return err
    }
}

addProducts = async (product) => {
try {
    await  productsModel.create(product)
    return productsModel.findOne({code : product.code})
} catch (error) {
    console.log ( "Error al crear el producto.",error)
}
}

updateProducts = async (id,product) => {
try {
    return await productsModel.findByIdAndUpdate(id,{$set : product})
    
} catch (error) {
    console.log ("Error al actualizar el Producto." ,error)
}
}

deleteProducts = async (id,product) => {
try {
     return await productsModel.findByIdAndDelete (id)
} catch (error) {
    console.log("Error al eliminar el producto.",error)
}}

 cateG= async () =>{
    try {
      const cateG = await productsModel.aggregate([
        {
          $group: {
            _id: null,
            category: { $addToSet: "$category" }
          }
        }
      ])
      return cateG[0].category
    } catch (error) {
      console.error("Error al obtener las categorías.", error)
      throw error
    }
  }
}

export default ProductManager