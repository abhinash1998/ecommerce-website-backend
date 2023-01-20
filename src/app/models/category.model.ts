import mongoose = require('mongoose');
import { eModel } from '../enum/model.enum';

export interface ICategoryModel {
	name: string;
	desc?: string;
	categoryImage: string;
	code: string;
	parentCode: string;
	createdAt: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	activeStatus: Number;
}

const categorySchema = new mongoose.Schema<ICategoryModel>({
	name: {
		type: String,
		required: true
	},
	desc: {
		type: String
	},
	categoryImage: {
		type: String,
		required: true
	},
	code: {
		type: String,
		unique: true,
		required: true
	},
	parentCode: {
		type: String,
		default: 'CW'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date
	},
	deletedAt: {
		type: Date
	},
	activeStatus: {
		type: Number,
		default: 1
	}
});

const Category = mongoose.model<ICategoryModel>(
	eModel.Category,
	categorySchema
);

export default Category;
