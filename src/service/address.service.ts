import { PrismaClient, Address, Prisma } from '@prisma/client';
import userService from './user.service';
import branchService from './branch.service';
import Logger from '../lib/logger';
const prisma = new PrismaClient();

export default {
    //GET
    async getAddress(addressWhereUniqueInput: Prisma.AddressWhereUniqueInput): Promise<Address | null> {
        return prisma.address.findUnique({
            where: addressWhereUniqueInput,
            include: {
                branch: true,
                user: true,
            }
        });
    },

    //DELETE
    async deleteAddress(addressWhereUniqueInput: Prisma.AddressWhereUniqueInput): Promise<void> {
        //Ověřit, zda existuje user nebo branch s touto adresou, potom nemazat
        const user = await userService.user({ addressId: addressWhereUniqueInput.id });
        const branch = await branchService.getBranch({ addressId: addressWhereUniqueInput.id });
        if (branch === null && user === null) {
            try {
                await prisma.address.delete({
                    where: addressWhereUniqueInput
                })
            } catch (err) {
                Logger.error(`Failed to delete address ${addressWhereUniqueInput.id}: ${err}`)
            }
        }
        return
    }
}