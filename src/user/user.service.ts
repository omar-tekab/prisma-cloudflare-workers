import httpStatus from 'http-status';
import { Prisma, PrismaClient,User } from '@prisma/client/edge';
import { PasswordService } from '../password.service';
import { PaginatedInterface } from '../util/PaginatedInterface';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Create an instance of PasswordService
const passwordService = new PasswordService(8);

// Define interfaces for filter and options
interface findManyFilter {
  email: string | undefined;
}

interface findManyOptions {
  sortBy: string;
  limit: number;
  page: number;
}

// Function to find multiple users with pagination
export const findMany = async (
  args: Prisma.UserFindManyArgs
): Promise<PaginatedInterface<User>> => {
  try {
    const [data, totalCount] = await Promise.all([
      prisma.user.findMany(args),
      prisma.user.count({ where: { deletedAt: null } }),
    ]);
    return { paginatedResult: data, totalCount };
  } catch (error:any) {
    throw new Error(`Error finding users: ${error.message}`);
  }
};

// Function to get a user by username (email)
export const getUserByEmail = async (
  username: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error:any) {
    throw new Error(`Error fetching user by email: ${error.message}`);
  }
};

// Function to update a user by ID
export const update = async (
  args: Prisma.UserUpdateArgs
): Promise<User> => {
  try {
    // Hash the password if it is provided in the update data
    if (args.data.password) {
      args.data.password = await passwordService.hash(args.data.password);
    }

    const updatedUser = await prisma.user.update(args);
    return updatedUser;
  } catch (error:any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Function to create a new user
export const create = async (
  args: Prisma.UserCreateArgs
): Promise<User> => {
  try {
    // Hash the password before creating the user
    if (args.data.password) {
      args.data.password = await passwordService.hash(args.data.password);
    }

    const newUser = await prisma.user.create(args);
    return newUser;
  } catch (error:any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};