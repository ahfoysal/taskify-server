import { z } from 'zod';

const loginZOdSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email  is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZOdSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Valid token  is required',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
});

export const AuthValidation = {
  loginZOdSchema,
  refreshTokenZOdSchema,
  changePasswordZodSchema,
};
