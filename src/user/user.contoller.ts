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

import {UserUpdateInput} from './UserUpdateInput'
import {UserWhereUniqueInput} from './UserWhereUniqueInput'

// export const createUser: Handler<Environment> = async (c) => {
//   const bodyParse = await c.req.json()
//   const body = await userValidation.createUser.parseAsync(bodyParse)
//   const user = await userService.createUser(body, config.database)
//   return c.json(user, httpStatus.CREATED as StatusCode)
// }

// export const getUsers: Handler<Environment> = async (c) => {
//   const config = getConfig(c.env)
//   const queryParse = c.req.query()
//   const query = userValidation.getUsers.parse(queryParse)
//   const filter = { email: query.email }
//   const options = { sortBy: query.sort_by, limit: query.limit, page: query.page }
//   const result = await userService.queryUsers(filter, options, config.database)
//   return c.json(result, httpStatus.OK as StatusCode)
// }

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

export const updateUser= async (c:any) => {
  // const config = getConfig(c.env)
  const paramsParse = c.req.param()
  console.log(paramsParse,"paramsParse")
  // const bodyParse = await c.req.json()
  // console.log(bodyParse,"bodyParse")
  const params = UserWhereUniqueInput.parse(paramsParse)
  console.log('rrrrrrrrrrrr')
  // const body = UserWhereUniqueInput.parse(bodyParse)
  console.log('bbbbbbbbbbb')
try{
  const updatedUser = await prisma.user.findFirst({
    where: { id: params.id },
  });  
  console.log('ccccccccccccc')
  return c.json(updatedUser, 200 as StatusCode)

}
catch(error){
  console.log(error,'eeeeeeeeeeeeeeeee')

return c.json(null, 400 as StatusCode)
}

}
export const routeUpdateUser = createRoute({
  method: 'get',
  path: '/users/:id',
  request: {
    params: UserWhereUniqueInput,
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
