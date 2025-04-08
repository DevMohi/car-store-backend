// import { NextFunction, Request, Response } from 'express';
// import catchAsync from '../utils/catchAsync';
// import AppError from '../errors/AppError';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/user/user.constant';
// import { User } from '../modules/user/user.model';

// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

// const auth = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // console.log(req.headers.authorization);
//     const token = req.headers.authorization;

//     //checking if the token is sent from the client
//     if (!token) {
//       throw new AppError(401, 'You are not authorized');
//     }

//     //check if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//     ) as JwtPayload;
//     //Role check
//     const { role, userId, iat } = decoded;

//     //checking if user exist
//     const user = await User.isUserExistsByCustomId(userId);

//     if (!user) {
//       throw new AppError(404, 'This user is not found');
//     }

//     // //checking if the user is already deleted
//     const isUserDeleted = user?.isDeleted;
//     if (isUserDeleted) {
//       throw new AppError(404, 'This user is deleted');
//     }

//     // //check if the user is blocked
//     const userStatus = user?.status;
//     if (userStatus === 'blocked') {
//       throw new AppError(404, 'This user is blocked');
//     }

//     //compare time for token
//     if (
//       user.passwordChangedAt &&
//       User.isJWTIssuedBeforePasswordChanged(
//         user.passwordChangedAt,
//         iat as number,
//       )
//     ) {
//       throw new AppError(401, 'New Token needed');
//     }

    
//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         401,
//         'You are not authorized and do not have the permission',
//       );
//     }
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default auth;
