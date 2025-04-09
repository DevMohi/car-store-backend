import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

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

export const AuthServices = {
  loginUser,
};
