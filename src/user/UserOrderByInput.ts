import { z } from '@hono/zod-openapi';

const sortEnum = z.enum(['asc', 'desc']);

const userOrderByInputSchema = z.object({
  password: sortEnum.optional(),
  id: sortEnum.optional(),
  createdAt: sortEnum.optional(),
  updatedAt: sortEnum.optional(),
  deletedAt: sortEnum.optional(),
  firstName: sortEnum.optional(),
  lastName: sortEnum.optional(),
  username: sortEnum.optional(),
  isValid: sortEnum.optional(),
  roles: sortEnum.optional(),
});

const UserOrderByInput = userOrderByInputSchema.openapi({
  example: {
    password: 'asc',
    id: 'desc',
    createdAt: 'asc',
    updatedAt: 'desc',
    deletedAt: 'asc',
    firstName: 'asc',
    lastName: 'desc',
    username: 'asc',
    isValid: 'desc',
    roles: 'asc',
  },
});

export { UserOrderByInput };
