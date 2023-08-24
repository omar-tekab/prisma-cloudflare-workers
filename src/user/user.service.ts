import httpStatus from 'http-status'
import { InsertResult, UpdateResult } from 'kysely'
import {User} from './User'
import {UpdateUser} from './UserUpdateInput'
import PrismaEdge from "@prisma/client/edge"
const { PrismaClient } = PrismaEdge
const prisma = new PrismaClient()

interface getUsersFilter {
  email: string | undefined
}

interface getUsersOptions {
  sortBy: string
  limit: number
  page: number
}



export const getUserByEmail = async (
    username: string,
): Promise<any | undefined> => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      return user;
    } catch (error : any) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  export const updateUserById = async (
    userId: string|undefined,
    updateBody: UpdateUser
  ): Promise<User> => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateBody,
      });
  
      if (!updatedUser) {
        throw new Error( 'User not found');
      }
  
      return updatedUser;
    } catch (error) {
      console.log(error)
      throw new Error( 'Internal server error',);
    }
  };