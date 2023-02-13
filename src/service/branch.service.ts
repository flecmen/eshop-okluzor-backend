import { PrismaClient, Branch, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import addressService from './address.service';

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

    //SET
    async createBranch(data: Prisma.BranchCreateInput): Promise<Branch> {
        return prisma.branch.create({
            data,
        });
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
            console.log(`error deleting user ${branchWhereUniqueInput.id}: ${err}`)
        }
        return
    }
}