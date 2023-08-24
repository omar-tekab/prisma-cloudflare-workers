import jwt from '@tsndr/cloudflare-worker-jwt'
import { MiddlewareHandler } from 'hono'
import httpStatus from 'http-status'
import { Environment } from '../../bindings'
import { getConfig } from '../config/config'
import { roleRights, Permission, Role } from '../config/roles'
import { tokenTypes } from '../config/tokens'

const authenticate = async (jwtToken: string, secret: string) => {
  let authorized = false
  let payload
  try {
    authorized = await jwt.verify(jwtToken, secret)
    const decoded = jwt.decode(jwtToken)
    payload = decoded.payload
    authorized = authorized && payload.type === tokenTypes.ACCESS
  } catch (e) {}
  return { authorized, payload }
}

export const auth =
  (...requiredRights: Permission[]): MiddlewareHandler<Environment> =>
  async (c, next) => {
    console.log('oooooooo')
    const credentials = c.req.headers.get('Authorization')
    console.log(credentials,'credentials')
    if (!credentials) {
      throw new Error('Please authenticate')
    }

    const parts = credentials.split(/\s+/)
    if (parts.length !== 2) {
      throw new Error('Please authenticate')
    }

    const jwtToken = parts[1]
    console.log(jwtToken,'jwtToken')
    const { authorized, payload } = await authenticate(jwtToken, "omar")

    if (!authorized || !payload) {
    console.log('rrrrrrrrrrrr')
    }

    // if (requiredRights.length) {
    //   const userRights = roleRights[payload.role as Role]
    //   const hasRequiredRights = requiredRights.every((requiredRight) =>
    //     (userRights as unknown as string[]).includes(requiredRight)
    //   )
    //   if (!hasRequiredRights && c.req.param('userId') !== payload.sub) {
    //     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
    //   }
    // }
    // if (!payload.isEmailVerified) {
    //   const user = await getUserById(Number(payload.sub), config['database'])
    //   if (!user) {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
    //   }
    //   const url = new URL(c.req.url)
    //   if (url.pathname !== '/v1/auth/send-verification-email') {
    //     throw new ApiError(httpStatus.FORBIDDEN, 'Please verify your email')
    //   }
    // }
    else {
    c.set('payload', payload)

    await next() }
  }