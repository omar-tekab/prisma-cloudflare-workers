import httpStatus from 'http-status'
import { InsertResult, UpdateResult } from 'kysely'
import {User} from './User'
import {UpdateUser} from './UserUpdateInput'
import PrismaEdge , {Prisma} from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { transformStringFieldUpdateInput } from "../prisma.util";
import {PasswordService } from "../password.service"
import { PaginatedInterface } from "../util/PaginatedInterface";


const { PrismaClient } = PrismaEdge
const prisma = new PrismaClient().$extends(withAccelerate())

const PasswordServiceClass = new PasswordService(8)
interface getUsersFilter {
  email: string | undefined
}

interface getUsersOptions {
  sortBy: string
  limit: number
  page: number
}



export const findMany = async (
  args: Prisma.UserFindManyArgs
): Promise<PaginatedInterface<User>> => {
  console.log(args,"argsargs")
  const [data, totalCount] = await Promise.all([
    prisma.user.findMany(args),
    prisma.user.count({ where: { deletedAt: null } }),
  ]);
  console.log(data,"rrrrrrrrrrr")
  return { paginatedResult: data, totalCount };
};


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

  // export const updateUserById = async (
  //   userId: string|undefined,
  //   updateBody: UpdateUser
  // ): Promise<User> => {
  //   try {
  //     const updatedUser = await prisma.user.update({
  //       where: { id: userId },
  //       data: updateBody,
  //     });
  
  //     if (!updatedUser) {
  //       throw new Error( 'User not found');
  //     }
  
  //     return updatedUser;
  //   } catch (error) {
  //     console.log(error)
  //     throw new Error( 'Internal server error',);
  //   }
  // };

  export const updateUserById = async (
    args: Prisma.UserUpdateArgs
  )=> {
        return await prisma.user.update({
          ...args,
    
          data: {
            ...args.data,
    
            password: args.data.password
              ? args.data.password &&
                (await transformStringFieldUpdateInput(
                  args.data.password!,
                  (password) => PasswordServiceClass.hash(password)
                ))
              : undefined,
          },
        });
      }
    
      export const createUser = async (
        args: Prisma.UserCreateArgs
      ) => {
        return await prisma.user.create({
          ...args,
      
          data: {
            ...args.data,
      
            password: args.data.password
              ? await PasswordServiceClass.hash(args.data.password!)
              : undefined,
          },
        });
      };
      