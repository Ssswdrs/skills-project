import argon2 from "argon2";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const register = async (userData) => {
    try {
        
        const Username = userData.username;
        const Password = userData.password;
        await prisma.users.create({
            data: {
              username: Username,
              password: await argon2.hash(Password),
              refresh: ''
            },
          })
        if (!Username || !Password) {
            throw new Error('Username and Password invalid');
        }

        return {
            success : true,
        };
    } catch (error) {
        // Catch and handle any errors
        console.error('Error during register:', error);
        return {
            success : false,
        };
    }finally{
        await prisma.$disconnect()
    }
};

export default { register }