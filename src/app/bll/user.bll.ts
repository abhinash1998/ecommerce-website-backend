import {
	SignInUserRequest,
	SignUpUserRequest
} from '../interface/user/user.interface';
import User, { IUserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserBLL {
	/**
	 * This method is used to save new user
	 *
	 * @param {SignUpUserRequest} signupUserRequest
	 * @return {*}  {(Promise<{ status: boolean; message: string | IUserModel }>)}
	 * @memberof UserBLL
	 */
	async signUpUser(
		signupUserRequest: SignUpUserRequest
	): Promise<{ status: boolean; message: string | IUserModel }> {
		try {
			let { name, email, password, contactNumber } = signupUserRequest;
			const existingUser = await User.findOne({ email });

			if (!!existingUser) {
				return {
					status: false,
					message:
						'Duplicate Registration. Same email already exists. Please login'
				};
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);

				const savedUser: IUserModel = await new User({
					name,
					email,
					password: hashedPassword,
					contactNumber
				}).save();

				return {
					status: true,
					message: savedUser
				};
			}
		} catch (error) {
			throw new Error(
				`method : signUpUser class: UserBLL Error: ${error}`
			);
		}
	}

	/**
	 * This method is used to login user
	 *
	 * @param {SignInUserRequest} signinUserRequest
	 * @return {*}  {Promise<{ status: boolean; message: string }>}
	 * @memberof UserBLL
	 */
	async signinUser(
		signinUserRequest: SignInUserRequest
	): Promise<{ status: boolean; message: string }> {
		try {
			let { email, password } = signinUserRequest;
			const existingUser = await User.findOne({ email });

			if (!!existingUser) {
				const isValid = await bcrypt.compare(
					password,
					existingUser.password
				);
				if (isValid)
					return {
						status: true,
						message: 'Successfully logged in!!'
					};
				else
					return {
						status: false,
						message: 'Invalid password. Authentication failed.'
					};
			} else {
				return {
					status: false,
					message: 'No such user found. Please check your email.'
				};
			}
		} catch (error) {
			throw new Error(
				`method : signinUser class: UserBLL Error: ${error}`
			);
		}
	}
}
