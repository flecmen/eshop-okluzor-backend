import { PrismaClient, Branch, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    //GET

    async branches(branchWhereInput: Prisma.BranchWhereInput): Promise<Branch[] | null> {
        return prisma.branch.findMany({
            where: branchWhereInput,
            include: {
                address: true,
            }
        })
    },

    //SET
    async createBranch(data: Prisma.BranchCreateInput): Promise<Branch> {
        return prisma.branch.create({
            data,
        });
    },
}