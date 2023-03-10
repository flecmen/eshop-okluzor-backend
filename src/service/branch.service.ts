import { PrismaClient, Branch, Prisma, Address } from '@prisma/client';
import addressService from './address.service';
import Logger from '../lib/logger';
const prisma = new PrismaClient();
interface extendedBranch extends Branch {
    address: Address;
}

export default {
    //GET
    async getBranch(branchWhereUniqueInput: Prisma.BranchWhereUniqueInput): Promise<extendedBranch | null> {
        return prisma.branch.findUnique({
            where: branchWhereUniqueInput,
            include: {
                address: true,
            }
        })
    },

    async getBranches(branchWhereInput: Prisma.BranchWhereInput): Promise<Branch[] | null> {
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

    async updateBranch(branchWhereUniqueInput: Prisma.BranchWhereUniqueInput, branchUpdateInput: Prisma.BranchUpdateInput): Promise<Branch> {
        let onlyBranch = branchUpdateInput;
        delete onlyBranch?.address;
        Logger.debug(branchUpdateInput)
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