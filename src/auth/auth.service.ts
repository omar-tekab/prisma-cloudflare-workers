import httpStatus from 'http-status'
import {PasswordService } from "../password.service"
import * as userService from '../user/user.service'
const PasswordServiceClass = new PasswordService(8)

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
  ): Promise<any> => {
  const user = await userService.getUserByEmail(email)
  console.log(user,"iiiiii")
  // If password is null then the user must login with a social account
  if (!user) {
    throw new Error( 'email invalid')
  }
  const compareResponse = await PasswordServiceClass.compare(password,user.password)
  console.log(compareResponse,"compareREspancecompareREspance")
  if (!compareResponse) {
    throw new Error( 'password invalid')
  }
  return user
}

