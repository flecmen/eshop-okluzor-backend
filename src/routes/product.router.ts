import express from "express";
import Logger from "../lib/logger";
import _ from "lodash";
import productController from "src/controllers/product-controller";



const router = express.Router();

//GET by status
router.get('/', productController.getProducts)
//Get order by Id
router.get('/:productId', productController.getProductById)
router.put('/', productController.createProduct)
router.put('/:productId', productController.updateProduct)


export default router;