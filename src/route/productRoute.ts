import {Router} from 'express'
import { productController } from '../Controller/ProductController'

const productRoute:Router = Router()

productRoute.post('/create', productController.createProduct )
productRoute.get('/', productController.getAllProduct)
productRoute.get('/:id', productController.getProductById)
productRoute.put('/edit/:id', productController.updateProduct)
productRoute.delete('/remove/:id', productController.removeProduct)

export default productRoute
