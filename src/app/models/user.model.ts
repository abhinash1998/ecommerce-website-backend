import mongoose = require('mongoose');
import { eModel } from '../enum/model.enum';

export interface IUserModel {
	name: string;
	email: string;
	password: string;
	gender?: string;
	contactNumber?: number;
	role: string;
	createdAt: Date;
	updatedAt?: Date;
	pofilePicture?: string;
}

const userSchema = new mongoose.Schema<IUserModel>({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female']
	},
	contactNumber: {
		type: Number
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date
	},
	pofilePicture: { type: String }
});

const User = mongoose.model<IUserModel>(eModel.User, userSchema);

export default User;
