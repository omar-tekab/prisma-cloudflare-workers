import { z } from '@hono/zod-openapi';

// Define the userWhereInputSchema using Zod
const userWhereInputSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
});

// Define an OpenAPI example using userWhereInputSchema
const openAPISchema = userWhereInputSchema.openapi({
  example: {
    id: 'example_id',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
  },
});

// Export the OpenAPI example with a more descriptive name
export { openAPISchema as UserWhereInput };