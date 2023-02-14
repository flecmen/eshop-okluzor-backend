import { PrismaClient, User, Prisma, Branch, Address } from '@prisma/client';
import addressService from './address.service';
import Logger from '../lib/logger';
import branchService from './branch.service';
const prisma = new PrismaClient();

interface extendedBranch extends Branch {
    address: Address;
}
interface ExtendedUser extends User {
    branch: extendedBranch[];
    address: Address;
}

export default {


    //GET
    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<ExtendedUser | null> {
        return prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                branch: {
                    include: {
                        address: true,
                    }
                },
                address: true,
            }
        });
    },

    async allUsers(): Promise<Object | null> {
        return await prisma.user.findMany({
            include: {
                branch: {
                    include: {
                        address: true,
                    }
                },
                address: true,
            }
        });
    },


    //SET

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        });
    },

    async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
        let onlyUser = data
        delete onlyUser?.address
        delete onlyUser?.branch

        let updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: data
        })

        return updatedUser
    },

    async updatePassword(userWhereUniqueInput: Prisma.UserWhereUniqueInput, password: User["password"]) {
        return prisma.user.update({
            where: userWhereUniqueInput,
            data: {
                password
            }
        })
    },

    //DELETE
    async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<void> {
        const user = await this.user(userWhereUniqueInput)
        const addressId = user?.addressId;

        try {
            await prisma.user.delete({
                where: userWhereUniqueInput
            })
            await addressService.deleteAddress({ id: addressId })
        } catch (err) {
            Logger.error(`Failed to delete user ${userWhereUniqueInput.id}: ${err}`)

        }
        return
    },


}
