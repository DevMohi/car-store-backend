import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

//user either admin hobe ar nahole customer hobe
const createUserIntoDB = async (userInfo: TUser) => {
  const result = await User.create(userInfo);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

//update User Based on admin or customer
const updateUserInfoIntoDB = async (
  userInfo: Partial<TUser>,
  email: string,
) => {
  console.log(email);

  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  if (userInfo.password) {
    throw new AppError(401, 'cannot change password without current password');
  }

  const result = await User.findOneAndUpdate({ email }, userInfo, {
    new: true,
    runValidators: true,
  });

  return result;
};

// user - status
const userStatusUpdateIntoDB = async (id: string, status: string) => {
  if (status !== 'active' && status !== 'deactive') {
    throw new AppError(
      401,
      'Provide a proper status either active or deactive ',
    );
  }
  //   console.log(id, status);
  const result = await User.findByIdAndUpdate(
    id,
    { status: status },
    { new: true, runValidators: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUserInfoIntoDB,
  userStatusUpdateIntoDB,
};
