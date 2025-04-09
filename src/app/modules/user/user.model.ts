import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

// hash password and save into Database(the hash password)
userSchema.pre('save', async function (next) {
  const user = this; //this refers to document
  user.password = await bcrypt.hash(
    user.password, //password to be hashed
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//remove it from doc, wont effect the original document
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//static method
userSchema.statics.isUserExistByEmail = async function (email: string) {
  //select kortesi because doc theke remove korsilam
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
