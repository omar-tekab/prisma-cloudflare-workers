// Import necessary modules and types
import { User } from "./User";
import { z } from '@hono/zod-openapi';

// Define the schema for GetListUserDto
const getListUserDtoSchema = z.object({
  paginatedResult: z.array(User), // An array of User objects
  totalCount: z.number(), // Total count of users
});

// Define an example for GetListUserDto
const getListUserDtoExample = getListUserDtoSchema.openapi({
  example: {
    paginatedResult: [
      {
        id: 'yourUserID', // Replace with a real user ID
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
    ],
    totalCount: 1, // Total count of users (replace with the actual count)
  },
});

// Export the example as GetListUserDto
export { getListUserDtoExample as GetListUserDto };