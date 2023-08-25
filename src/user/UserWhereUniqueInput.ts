import { z } from '@hono/zod-openapi'

const UserWhereUniqueInputSchema = z.object({
    id: z.string().optional()

});
  
  // Generate OpenAPI schema with examples
  const openAPISchema = UserWhereUniqueInputSchema.openapi({
    example: {
      id: 'example_id'
  }});

export {openAPISchema as UserWhereUniqueInput }