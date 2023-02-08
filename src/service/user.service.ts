import { PrismaClient, User, Prisma } from '@prisma/client';
const prisma = new PrismaClient();


export default {
    //GET
    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
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

    async updatePassword(email: User["email"], password: User["password"]) {
        return prisma.user.update({
            where: {
                email
            },
            data: {
                password
            }
        })
    },

    //DELETE
    async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<void> {
        try {
            await prisma.user.delete({
                where: userWhereUniqueInput
            })
        } catch (err) {
            console.log(`error deleting user ${userWhereUniqueInput.id}: ${err}`)
        }
        return
    },


}
