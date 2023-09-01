import {User} from "./User" 
import { z } from '@hono/zod-openapi';

const getListUserDtoSchema = z.object({
    paginatedResult: z.array(User),
    totalCount: z.number(),
  });
  
  const getListUserDtoExample = getListUserDtoSchema.openapi({
    example: {
      paginatedResult: [
        {
          id: 'ffffffffffffffff',
          deletedAt: '2023-08-24T12:00:00Z',
          createdAt: '2023-08-24T10:00:00Z',
          updatedAt: '2023-08-24T11:30:00Z',
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          password: null,
          isValid: true,
          roles: "['admin', 'user']",
        },
      ],
      totalCount: 1,
    },
  });
  
  export {  getListUserDtoExample as GetListUserDto };