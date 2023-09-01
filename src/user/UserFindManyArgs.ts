import {userOrderByInput} from './UserOrderByInput'
import { UserWhereInput } from './UserWhereInput';
import { z } from '@hono/zod-openapi';
import {stringConvertibleToNumber} from "../util/StringConvertibleToNumber"

const userFindManyArgsSchema = z.object({
    where: z.object({where:UserWhereInput.optional()}).optional(),
    orderBy: z.object({orderBy:userOrderByInput.optional()}).optional(),
    skip: stringConvertibleToNumber.optional().openapi({example:"10"}),
    take: stringConvertibleToNumber.optional().openapi({example:"10"}),
  });


  
  export { userFindManyArgsSchema as UserFindManyArgs };