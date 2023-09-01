// @ts-ignore
import bcrypt from 'bcryptjs'

export class PasswordService {
salt: any;
  constructor( saltOrRounds:any) {
    this.salt = parseSalt(saltOrRounds);
  }

  async compare(password:any, encrypted:any) {
    return await bcrypt.compare(password, encrypted);
  }

  async hash(password:any) {
    if (password?.length === 0) {
      return password;
    } else {
        console.log('eeeeeeeeeeee')
      return bcrypt.hash(password, this.salt);
    }
  }
}

function parseSalt(value:any) {
  if (value === undefined) {
    throw new Error("BCRYPT_SALT is not defined");
  }

  const rounds = Number(value);

  if (isNaN(rounds)) {
    return value;
  }
  if (!Number.isInteger(rounds) || rounds < 0) {
    throw new Error("BCRYPT_SALT must be a positive integer or text");
  }
  return rounds;
}

