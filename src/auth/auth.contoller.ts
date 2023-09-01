import { Handler } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import httpStatus from 'http-status'
import * as authService from './auth.service'
import * as authValidation from './auth.validation'
import * as tokenService from './token.service'
import { createRoute } from '@hono/zod-openapi'

import {GetListUserDto} from '../user/getListUser.dto'

/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Get a list of resources
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: List of resources retrieved successfully
 *               data: [resource1, resource2]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while fetching resources
 */
export const login = async (c:any) => {
  try{
  const bodyParse = await c.req.json()
  const { email, password } = authValidation.userlogin.parse(bodyParse)
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)

  return c.json({ user , tokens}, httpStatus.OK as StatusCode)
  }
  catch(err:any){
   return c.json({ code:'400' , error:err.message}, 400 as StatusCode)
  }
}

export const routeLoginUser = createRoute({
  method: 'post',
  path: '/login',
  request: {
    body:{
      content:{
        'application/json': {
          schema: authValidation.userlogin,
        },
      },
    },
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
