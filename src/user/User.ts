import { z } from '@hono/zod-openapi';

export const userSchema = z.object({
    password: z.optional(z.union([
      z.string(),
      z.null(),
    ])),
    id: z.string(),
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
    username: z.string(),
    isValid: z.optional(z.union([
      z.boolean(),
      z.null(),
    ])),
    roles: z.string(),
  });

  const openApiExample = userSchema.openapi({
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
      roles: "['admin', 'user']"
    }
  });
 export type User =
  | z.infer<typeof openApiExample>

export { openApiExample as User};