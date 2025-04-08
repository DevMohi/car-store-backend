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
  userStatusUpdateIntoDB,
};
