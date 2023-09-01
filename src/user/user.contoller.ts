import { Handler } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
// import httpStatus from 'http-status'
// import { Environment } from '../../bindings'
import { createRoute } from '@hono/zod-openapi'
import { OpenAPIHono } from '@hono/zod-openapi'
import { prettyJSON } from 'hono/pretty-json'
import PrismaEdge from "@prisma/client/edge"
const { PrismaClient } = PrismaEdge
const prisma = new PrismaClient()
// import { getConfig } from '../config/config'
import * as userService from './user.service'
import * as abacUtil from "../auth/abac.util";

import {UserUpdateInput} from './UserUpdateInput'
import {UserCreateInput} from './UserCreateInput'
import {userUpdateInputSchema} from './UserUpdateInput'
import {UpdateUser} from './UserUpdateInput'
import {UserWhereUniqueInput} from './UserWhereUniqueInput'
import {UserFindManyArgs} from './UserFindManyArgs'
import {GetListUserDto} from './getListUser.dto'
import {processArgs} from '../util/ProcessArgs'
import {checkPermission} from '../util/checkPermission'

// create user
export const createUser: any = async (c: any) => {
  const permission=checkPermission("admin","createAnyUserhhhhhhh")
  if(!permission){
    return c.json(
      {
        code: 403,
        message: 'Validation Error',
      },
      403
    )
  }
  const bodyParse = await c.req.json();
  const body = UserCreateInput.parse(bodyParse);

  // If permission check passes, create the user
  const user = await userService.createUser({ data: body });
  return c.json(user, 200 as StatusCode);
};

export const routeCreateUser = createRoute({
  method: 'post',
  path: '/user',
  request: {
    body:{
      content:{
        'application/json': {
          schema: UserCreateInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserCreateInput,
        },
      },
      description: 'Create the ussssssser',
    },

  },
})



// find many users
export const getUsers= async (c:any) => {
  const queryParse = c.req.query()
  console.log(JSON.stringify(queryParse),"queryParse")
  const args = UserFindManyArgs.parse(processArgs(queryParse))
  console.log(JSON.stringify(args.skip),"zzzzzzzzzzzzzzzzzzzzzzzzz")

  const result = await userService.findMany({
    where:args?.where?args.where.where:undefined,
    orderBy:args?.orderBy?args.orderBy.orderBy:undefined,
    skip:args.skip ? parseInt(args.skip) : undefined,
    take:args.take ? parseInt(args.take) : undefined,
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      firstName: true,
      lastName: true,
      username: true,
      isValid: true,
      roles: true,
    },
  });
  return c.json({ paginatedResult: result.paginatedResult, totalCount: result.totalCount }, 200 as StatusCode)


}

export const routeFindManyUser = createRoute({
  method: 'get',
  path: '/users',
  request: {
    query:UserFindManyArgs
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetListUserDto,
        },
      },
      description: 'Create the user',
    },
  },
})

// export const getUser: Handler<Environment> = async (c) => {
//   const config = getConfig(c.env)
//   const paramsParse = c.req.param()
//   const params = userValidation.getUser.parse(paramsParse)
//   const user = await userService.getUserByEmail(params.userId)
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
//   }
//   return c.json(user, httpStatus.OK as StatusCode)
// }

export const updateUser: any = async (c:any) => {
  // const config = getConfig(c.env)
  const paramsParse = c.req.param()
  console.log(paramsParse,"paramsParse")
  const bodyParse = await c.req.json()
  console.log(bodyParse,"bodyParse")
  const params = UserWhereUniqueInput.parse(paramsParse)
  console.log(params,'rrrrrrrrrrrr')
  const body = UserUpdateInput.parse(bodyParse)
  console.log(body,"eeeeeeeeeeeeeeee")
  const user = await userService.updateUserById({
    where:{id:params.id}, data:body})
  return c.json(user, 200 as StatusCode)
}
export const routeUpdateUser = createRoute({
  method: 'patch',
  path: '/users/{id}',
  request: {
    params: UserWhereUniqueInput,
    body:{
      content:{
        'application/json': {
          schema: UserUpdateInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserUpdateInput,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

// export const deleteUser: Handler<Environment> = async (c) => {
//   const config = getConfig(c.env)
//   const paramsParse = c.req.param()
//   const params = userValidation.deleteUser.parse(paramsParse)
//   await userService.deleteUserById(params.userId, config.database)
//   c.status(httpStatus.NO_CONTENT as StatusCode)
//   return c.body(null)
// }
