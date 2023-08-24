import jwt from '@tsndr/cloudflare-worker-jwt'
import dayjs, { Dayjs } from 'dayjs'
import { Selectable } from 'kysely'
import { Config } from '../config/config'
import { Role } from '../config/roles'
import { TokenType, tokenTypes } from '../config/tokens'
// import { any } from '../models/any.model'

export const generateToken = async (
  anyId: number,
  type: TokenType,
  role: Role,
  expires: Dayjs,
  secret: string,
  isEmailVerified: boolean
) => {
  const payload = {
    sub: anyId.toString(),
    exp: expires.unix(),
    iat: dayjs().unix(),
    type,
    role,
    isEmailVerified
  }
  return jwt.sign(payload, secret)
}

export const generateAuthTokens = async (any: Selectable<any>) => {
  const accessTokenExpires = dayjs().add(15, 'minutes')
  const accessToken = await generateToken(
    any.id,
    tokenTypes.ACCESS,
    any.role,
    accessTokenExpires,
    "omar",
    any.is_email_verified
  )
  const refreshTokenExpires = dayjs().add(15, 'days')
  const refreshToken = await generateToken(
    any.id,
    tokenTypes.REFRESH,
    any.role,
    refreshTokenExpires,
    "omar",
    any.is_email_verified
  )
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}

export const verifyToken = async (token: string, type: TokenType, secret: string) => {
  const isValid = await jwt.verify(token, secret)
  if (!isValid) {
    throw new Error('Token not valid')
  }
  const decoded = jwt.decode(token)
  const payload = decoded.payload
  if (type !== payload.type) {
    throw new Error('Token not valid')
  }
  return payload
}

export const generateVerifyEmailToken = async (
  any: Selectable<any>, jwtConfig: Config['jwt']
) => {
  const expires = dayjs().add(jwtConfig.verifyEmailExpirationMinutes, 'minutes')
  const verifyEmailToken = await generateToken(
    any.id,
    tokenTypes.VERIFY_EMAIL,
    any.role,
    expires,
    jwtConfig.secret,
    any.is_email_verified
  )
  return verifyEmailToken
}

export const generateResetPasswordToken = async (
  any: Selectable<any>,
  jwtConfig: Config['jwt']
) => {
  const expires = dayjs().add(jwtConfig.resetPasswordExpirationMinutes, 'minutes')
  const resetPasswordToken = await generateToken(
    any.id,
    tokenTypes.RESET_PASSWORD,
    any.role,
    expires,
    jwtConfig.secret,
    any.is_email_verified
  )
  return resetPasswordToken
}
