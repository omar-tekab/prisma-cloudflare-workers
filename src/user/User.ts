import { z } from '@hono/zod-openapi';

// Define the User schema using Zod
export const userSchema = z.object({
  password: z.optional(z.union([z.string(), z.null()])),
  id: z.string(),
  createdAt: z.optional(z.union([z.date(), z.string()])),
  updatedAt: z.optional(z.union([z.date(), z.string(), z.null()])),
  deletedAt: z.optional(z.union([z.date(), z.string(), z.null()])),
  firstName: z.optional(z.union([z.string(), z.null()])),
  lastName: z.optional(z.union([z.string(), z.null()])),
  username: z.string(),
  isValid: z.optional(z.union([z.boolean(), z.null()])),
  roles: z.array(z.string()),
});

// Generate an OpenAPI example for the User schema
const openApiExample = userSchema.openapi({
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

// Define a User type using the generated example
export type User = z.infer<typeof openApiExample>;

// Export the generated OpenAPI example as User
export { openApiExample as User };