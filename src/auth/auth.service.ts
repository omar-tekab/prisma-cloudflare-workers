import httpStatus from 'http-status'

import * as userService from '../user/user.service'

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
  ): Promise<any> => {
  const user = await userService.getUserByEmail(email)
  // If password is null then the user must login with a social account
  if (user && !user.password) {
    throw new Error( 'Please login with your social account')
  }

  return user
}

