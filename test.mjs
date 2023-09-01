import { z } from "zod";
const stringConvertibleToNumber = z.string().refine((value) => {
  const parsedNumber = parseFloat(value);
  return !isNaN(parsedNumber) && isFinite(parsedNumber);
}, "Expected a string that can be converted to a number");

export function processArgs(args) {
  const where = {};
  const orderBy = {};

  for (const key of Object.keys(args)) {
    if (key.startsWith("where[")) {
      const field = key.substring(6, key.length - 1);
      where[field] = args[key] ;
    } else if (key.startsWith("orderBy[")) {
      const field = key.substring(8, key.length - 1);
      orderBy[field] = args[key] ;
    }
  }
  const skip = args.skip ? parseInt(args.skip) : undefined;
  const take = args.take ? parseInt(args.take) : undefined;

  const structuredData = {
    where: where,
    orderBy: orderBy,
    skip: skip,
    take: take,
  };

  return (structuredData)
}

const orderByInput = z.object({
  password: z.string().optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  isValid: z.string().optional(),
  roles: z.string().optional(),
});

const whereInput = z.object({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
});

const userFindManyArgsSchema = z.object({
  where: whereInput.optional(),
  orderBy: orderByInput.optional(),
  skip: z.number().optional(),
  take: z.number().optional(),
});

const inputData = {
  "where[id]": "example_id",
  "where[firstName]": "John",
  "where[lastName]": "Doe",
  "where[username]": "johndoe",
  "orderBy[password]": "asc",
  "orderBy[id]": "desc",
  // ... other fields ...
  skip: 30,
  take: 40,
};

try {
  const data = userFindManyArgsSchema.parse(processArgs(inputData));
  console.log("Validation successful:", data);
} catch (error) {
  console.error("Validation error:", error);
}