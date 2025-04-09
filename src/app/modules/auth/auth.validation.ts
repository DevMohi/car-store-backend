import { z } from 'zod';

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Please Provide Your Email' }),
    password: z.string({ required_error: 'Please Provide Your Password' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidationSchema = {
  userLoginValidationSchema,
  changePasswordValidationSchema,
};
