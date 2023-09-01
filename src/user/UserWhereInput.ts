import { z } from '@hono/zod-openapi';

const userWhereInputSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
});

const openAPISchema = userWhereInputSchema.openapi({
  example: {
    id: 'example_id',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
  },
});

export { openAPISchema as UserWhereInput };