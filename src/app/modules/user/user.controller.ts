import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await UserServices.createUserIntoDB(userInfo);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const userInfo = {
    ...req.body,
    role: 'admin', //by default we are setting this up
  };
  const result = await UserServices.createUserIntoDB(userInfo);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});


// Get All User Controllers
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users Retrieved Successful',
    data: result,
  });
});

//User update -> can be done by admin only
const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(id, status);

  const result = await UserServices.userStatusUpdateIntoDB(id, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  createAdmin,
  getAllUser,
  updateUserStatus,
};
