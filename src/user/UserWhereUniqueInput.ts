import { z } from '@hono/zod-openapi'

const UserWhereUniqueInputSchema = z.object({
    id: z.string().optional().openapi({
        param: {
          name: 'id',
          in: 'path',
        }
          })

});
  
  // Generate OpenAPI schema with examples
  const openAPISchema = UserWhereUniqueInputSchema.openapi({
    example: {
      id: 'example_id'
  }});

export {UserWhereUniqueInputSchema as UserWhereUniqueInput }