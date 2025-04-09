import { Model } from 'mongoose';
import { UserRole } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  image?: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'deactive'; //will be handled by admin
};

//need to add things over here
export interface UserModel extends Model<TUser> {
  // isUserExistsByCustomId(id: string): Promise<TUser>;

  isUserExistByEmail(email: string): Promise<TUser>;

  //for login password check kora lagbe
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
