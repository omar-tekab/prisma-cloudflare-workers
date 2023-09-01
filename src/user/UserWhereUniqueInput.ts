import { z } from '@hono/zod-openapi';

// Define the UserWhereUniqueInputSchema using Zod
const UserWhereUniqueInputSchema = z.object({
  id: z.string().optional(),
});

// Generate an OpenAPI schema with an example
const openAPISchema = UserWhereUniqueInputSchema.openapi({
  example: {
    id: 'example_id',
  },
});

// Export the OpenAPI schema with a more descriptive name
export { openAPISchema as UserWhereUniqueInput };