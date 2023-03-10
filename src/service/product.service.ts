import { PrismaClient, Product, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    async getProduct(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
        return await prisma.product.findUnique({
            where: productWhereUniqueInput
        })
    },
    async getProducts() {
        return await prisma.product.findMany()
    },
    async getCategories() {
        return await prisma.category.findMany()
    },
    async createProduct(productCreateInput: Prisma.ProductCreateInput) {
        return await prisma.product.create({
            data: productCreateInput
        })
    },
    async updateProduct(productWhereUniqueInput: Prisma.ProductWhereUniqueInput, productUpdateInput: Prisma.ProductUpdateInput) {
        return await prisma.product.update({
            where: productWhereUniqueInput,
            data: productUpdateInput,
        })
    },
}