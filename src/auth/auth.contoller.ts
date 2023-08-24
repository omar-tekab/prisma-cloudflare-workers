import { Handler } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import httpStatus from 'http-status'
import * as authService from './auth.service'
import * as authValidation from './auth.validation'
import * as tokenService from './token.service'


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
export const login: Handler<any> = async (c) => {
  const bodyParse = await c.req.json()
  const { email, password } = authValidation.login.parse(bodyParse)
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)

  return c.json({ user , tokens}, httpStatus.OK as StatusCode)
}

