import { z } from 'zod';

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Please Provide Your Email' }),
    password: z.string({ required_error: 'Please Provide Your Password' }),
  }),
});

export const AuthValidationSchema = {
  userLoginValidationSchema,
};
