import admin, { ServiceAccount } from 'firebase-admin';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

import { jwtHelpers } from '../../../helpers/jwtHelpers';
import firebaseConfig from '../../../shared/FirebaseConfig';
import { UserService } from '../user/user.service';
import { IChangePassword, IRefreshTokenResponse } from './auth.interface';
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as ServiceAccount),
});
const login = async (payload: any) => {
  const { email, password } = payload;

  // check user exists
  console.log(email);
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id: userId, role, email: userEmail, avatar, name } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id: userId, role, email: userEmail, avatar, name },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  // const { password: actualPass, ...restData } = isUserExist;
  return { accessToken, user: isUserExist };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let decodedToken = null;
  try {
    decodedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { id } = decodedToken;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const accessToken = jwtHelpers.createToken(
    { id: id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);

  const isUserExist = await User.findOne({ id: user?.id }).select('+password');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  isUserExist.password = newPassword;

  // updating using save()
  isUserExist.save();
};
const providerLogin = async (token: string) => {
  // check user exists

  const user = await admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      console.log(decodedToken);
      return decodedToken;
    })
    .catch(error => {
      // Token verification failed
      console.log(error);
    });

  if (user?.email) {
    const isUserExist = await User.isUserExist(user.email);
    if (!isUserExist) {
      const result = await UserService.createUser({
        name: user.name,
        avatar: (user.picture as string) || 'asdasd',
        email: user.email,

        role: 'user',
        password: 'not_provided',
      });

      return result;
    }
    const { _id: userId, role, email: userEmail, avatar } = isUserExist;

    const accessToken = jwtHelpers.createToken(
      { id: userId, role, email: userEmail, avatar },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    console.log(refreshToken);
    // const { password: actualPass, ...restData } = isUserExist;

    return { accessToken, user: isUserExist };
  }
};
const me = async (user: any) => {
  const userData = await User.findOne({ email: user.email }).populate('tasks');

  return { user: userData };
};
export const AuthService = {
  login,
  refreshToken,
  changePassword,
  providerLogin,
  me,
};
