import { PrismaClient, Branch, Prisma } from '@prisma/client';
import addressService from './address.service';
import Logger from '../lib/logger';
const prisma = new PrismaClient();


export default {
    //GET
    async getBranch(branchWhereUniqueInput: Prisma.BranchWhereUniqueInput): Promise<Branch | null> {
        return prisma.branch.findUnique({
            where: branchWhereUniqueInput,
            include: {
                address: true,
            }
        })
    },

    async branches(branchWhereInput: Prisma.BranchWhereInput): Promise<Branch[] | null> {
        return prisma.branch.findMany({
            where: branchWhereInput,
            include: {
                address: true,
            }
        })
    },

    //PUT
    async createBranch(data: Prisma.BranchCreateInput): Promise<Branch> {
        return prisma.branch.create({
            data,
        });
    },

    async updateBranch(branchWhereUniqueInput: Prisma.BranchWhereUniqueInput, branchUpdateInput: Prisma.BranchUpdateInput) {
        return prisma.branch.update({
            where: branchWhereUniqueInput,
            data: branchUpdateInput,
        })
    },
    //DELETE
    async deleteBranch(branchWhereUniqueInput: Prisma.BranchWhereUniqueInput): Promise<void> {
        const addressId = (await this.getBranch(branchWhereUniqueInput))?.addressId
        try {
            await prisma.branch.delete({
                where: branchWhereUniqueInput
            })
            await addressService.deleteAddress({ id: addressId })
        } catch (err) {
            Logger.error(`Failed to delete user ${branchWhereUniqueInput.id}: ${err}`)
        }
        return
    }
}