import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please Provide Your Name' }),
    email: z
      .string({ required_error: 'Please Provide a Valid Email!' })
      .email(),
    password: z.string({
      invalid_type_error: 'Please Provide Password',
    }),
    image: z.string().optional(),
    phone: z
      .string({ required_error: 'Phone Number Must Be String' })
      .optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please Provide a Bi-Cycle Name' })
      .optional(),
    phone: z
      .string({ required_error: 'Phone Number Must Be String' })
      .optional(),
    image: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
