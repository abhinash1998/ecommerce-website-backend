import { CategoryRequest } from '../interface/category/category.interface';
import * as dotenv from 'dotenv';
import Category, { ICategoryModel } from '../models/category.model';
dotenv.config();

export class CategoryBLL {
	/**
	 * This method is used to create new category
	 *
	 * @param {CategoryRequest} categoryRequest
	 * @param {string} imagePath
	 * @return {*}
	 * @memberof CategoryBLL
	 */
	async createCategory(
		categoryRequest: CategoryRequest,
		imagePath: string
	): Promise<ICategoryModel> {
		try {
			const { name, desc, code, parentCode } = categoryRequest;

			const savedCategory: ICategoryModel = await new Category({
				name,
				desc,
				code,
				parentCode,
				categoryImage: imagePath
			}).save();

			return savedCategory;
		} catch (error) {
			throw new Error(
				`method : createCategory class: CategoryBLL Error: ${error}`
			);
		}
	}

	/**
	 * This method is used to get all categories
	 *
	 * @return {*}  {Promise<ICategoryModel[]>}
	 * @memberof CategoryBLL
	 */
	async getAllCategories(): Promise<ICategoryModel[]> {
		try {
			const category = await Category.find({ activeStatus: 1 });
			category.map((item: ICategoryModel) => {
				item.categoryImage = process.env.API_URL + item.categoryImage;
			});
			return category;
		} catch (error) {
			throw new Error(
				`method : getAllCategories class: CategoryBLL Error: ${error}`
			);
		}
	}

	/**
	 * This method is used to get all categories by Category Code
	 *
	 * @param {string} categoryCode
	 * @return {*}  {Promise<ICategoryModel[]>}
	 * @memberof CategoryBLL
	 */
	async getAllCategoriesByCategoryCode(
		categoryCode: string
	): Promise<ICategoryModel[]> {
		try {
			const category = await Category.find({
				activeStatus: 1,
				parentCode: categoryCode
			});
			category.map((item: ICategoryModel) => {
				item.categoryImage = process.env.API_URL + item.categoryImage;
			});
			return category;
		} catch (error) {
			throw new Error(
				`method : getAllCategoriesByCategoryCode class: CategoryBLL Error: ${error}`
			);
		}
	}
}
