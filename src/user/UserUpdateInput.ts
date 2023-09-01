import { z } from '@hono/zod-openapi';

// Define the userUpdateInputSchema using Zod
export const userUpdateInputSchema = z.object({
  password: z.optional(z.union([
    z.string(),
    z.null(),
  ])),
  id: z.string().optional(),
  createdAt: z.optional(z.union([
    z.date(),
    z.string(),
  ])),
  updatedAt: z.optional(z.union([
    z.date(),
    z.string(),
    z.null(),
  ])),
  deletedAt: z.optional(z.union([
    z.date(),
    z.string(),
    z.null(),
  ])),
  firstName: z.optional(z.union([
    z.string(),
    z.null(),
  ])),
  lastName: z.optional(z.union([
    z.string(),
    z.null(),
  ])),
  username: z.string().optional(),
  isValid: z.optional(z.union([
    z.boolean(),
    z.null(),
  ])),
  roles: z.array(z.string()).optional(),
});

// Define an OpenAPI example using userUpdateInputSchema
const openApiExample = userUpdateInputSchema.openapi({
  example: {
    id: 'ffffffffffffffff',
    deletedAt: '2023-08-24T12:00:00Z',
    createdAt: '2023-08-24T10:00:00Z',
    updatedAt: '2023-08-24T11:30:00Z',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: null,
    isValid: true,
    roles: ['admin', 'user'],
  }
});

// Define a type alias for UpdateUser using z.infer
export type UpdateUser = z.infer<typeof userUpdateInputSchema>;

// Export the OpenAPI example with a more descriptive name
export { openApiExample as UserUpdateInput };