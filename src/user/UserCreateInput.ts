import { z } from '@hono/zod-openapi';

// Define the schema for user creation input using Zod
export const userCreateInputSchema = z.object({
  password: z.optional(z.union([z.string(), z.null()])),
  id: z.string().optional(),
  createdAt: z.optional(z.union([z.date(), z.string()])),
  updatedAt: z.optional(z.union([z.date(), z.string(), z.null()])),
  deletedAt: z.optional(z.union([z.date(), z.string(), z.null()])),
  firstName: z.optional(z.union([z.string(), z.null()])),
  lastName: z.optional(z.union([z.string(), z.null()])),
  username: z.string(),
  isValid: z.optional(z.union([z.boolean(), z.null()])),
  roles: z.array(z.string()),
});

// Generate an OpenAPI example for user creation input
const openApiExample = userCreateInputSchema.openapi({
  example: {
    id: 'ffffffffffffffff', // Replace with a real user ID
    deletedAt: '2023-08-24T12:00:00Z', // Replace with a real date and time
    createdAt: '2023-08-24T10:00:00Z', // Replace with a real date and time
    updatedAt: '2023-08-24T11:30:00Z', // Replace with a real date and time
    firstName: 'John', // User's first name
    lastName: 'Doe', // User's last name
    username: 'johndoe', // User's username
    password: null, // User's password (if applicable)
    isValid: true, // Indicates if the user is valid
    roles: ['admin', 'user'], // User's roles
  },
});

// Define a type for user creation input using the generated example
export type CreateUser = z.infer<typeof userCreateInputSchema>;

// Export the generated OpenAPI example as UserCreateInput
export { openApiExample as UserCreateInput };