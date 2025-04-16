import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  //if user does not exist
  if (!user) {
    throw new AppError(404, 'This user does not exist');
  }

  //Checking password
  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(401, 'Invalid password');
  }

  if (user?.status === 'deactive'){
    throw new AppError(401, 'Deactive Account');
  }

  //if they pass this send accessToken and refress token
  //create Token and send to client

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getUserFromDB = async (email: string) => {
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }
  user.password = '';
  return user;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByEmail(userData.email);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  console.log(payload.oldPassword, user?.password);

  //Check if password correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(409, 'Password not matched');
  }

  //jodi hoie jai hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );

  return result;
};

// Generate refresh token
const getNewRefreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'deactive') {
    throw new AppError(403, 'This user is deactive ! !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  getUserFromDB,
  changePassword,
  getNewRefreshToken
};
