import { z } from '@hono/zod-openapi';

export const stringConvertibleToNumber = z.string().refine((value) => {
  // Attempt to convert the string to a number
  const parsedNumber = parseFloat(value);
  // Check if the conversion was successful and the result is a finite number
  return !isNaN(parsedNumber) && isFinite(parsedNumber);
}, "Expected a string that can be converted to a number");
