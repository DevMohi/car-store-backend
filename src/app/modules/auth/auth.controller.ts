import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  console.log(accessToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Logged In Successfully',
    data: {
      accessToken,
    },
  });
});

//not completed yet
const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie('accessToken');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged out successfully',
    data: null,
  });
});

//Nijer Profile info nijer dekte parbe, for admin -> admin can see it and for customer the same thing.
const getMe = catchAsync(async (req, res) => {
  const result = await AuthServices.getUserFromDB(req?.user?.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Loggedin User Retrieved Successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  // console.log(req.user, req.body);
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password Changed Successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  logoutUser,
  getMe,
  changePassword,
};
