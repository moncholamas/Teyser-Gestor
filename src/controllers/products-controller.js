
//trae todas las versiones ->encontrar forma de filtrar la ultima
//trae todos los productos (activos y ultima version, precio actualizado)
async function getProducts(req,res,next){
    res.json({msg:'fn'})
}

//trae un producto y todas sus versiones
async function getProductById(req,res,next){
    res.json({msg:'fn'})
}

//ingresa un nuevo producto
async function createProduct(req,res,next){
    res.json({msg:'fn'})
}

//borra un producto por Id
//Un producto solo se puede borrar SI NINGUNA VERSION DEL MISMO ESTA YA EN UNA VENTA
async function deleteProduct(req,res,next){
    res.json({msg:'fn'})
}

//AUDITAR LOS CAMBIOS DE PRODUCTO
//actualiza un producto -> si un producto tiene que cambiar sus insumos se debe eliminar
async function updateProduct(req,res,next){
    res.json({msg:'fn'})
}

module.exports = {
    getProductById,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}