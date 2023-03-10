import { Product } from "@prisma/client";
import { Request, Response } from "express"
import productService from "../service/product.service";

export default {
    getProductById: async (req: Request, res: Response) => {
        const productId: Product["id"] = parseInt(req.params.productId);
        const product = await productService.getProduct({ id: productId })
        res.json(product)
    },
    getProducts: async (req: Request, res: Response) => {
        const products = await productService.getProducts();
        res.json(products)
    },
    getCategories: async (req: Request, res: Response) => {
        const categories = await productService.getCategories();
        res.json(categories)
    },
    createProduct: async (req: Request, res: Response) => {
        const product = req.body
        const new_product = await productService.createProduct(product)
        res.json(new_product)
    },
    updateProduct: async (req: Request, res: Response) => {
        const product = req.body
        const productId: Product["id"] = parseInt(req.params.productId);
        const new_product = await productService.updateProduct({ id: productId }, product)
        res.json(new_product)
    },

}