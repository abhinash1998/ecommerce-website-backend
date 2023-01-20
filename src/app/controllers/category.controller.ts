import { Request, Response } from 'express';
import { CategoryBLL } from '../bll/category.bll';
import { eErrorMessage } from '../enum/error-message.enum';
import { eStatusCode } from '../enum/status-code.enum';

export const createCategory = async (req: Request, res: Response) => {
	try {
		if (!Object.keys(req.body).length) {
			return res
				.status(eStatusCode.BAD_REQUEST)
				.send(eErrorMessage.FieldContent);
		}
		const imagePath = 'images/' + req.file.filename;
		const result = await new CategoryBLL().createCategory(
			req.body,
			imagePath
		);
		if (result) {
			return res.status(eStatusCode.CREATED).send(result);
		} else {
			return res
				.status(eStatusCode.BAD_REQUEST)
				.send('Failed to save Category');
		}
	} catch (error) {
		return res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
	}
};

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const result = await new CategoryBLL().getAllCategories();
		if (result.length) {
			return res.status(eStatusCode.OK).send(result);
		} else {
			return res
				.status(eStatusCode.NOT_FOUND)
				.send(eErrorMessage.NoRecord);
		}
	} catch (error) {
		res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
	}
};

export const getAllCategoriesByCategoryCode = async (
	req: Request,
	res: Response
) => {
	try {
		const categoryCode = req.params['categoryCode'];
		const result = await new CategoryBLL().getAllCategoriesByCategoryCode(
			categoryCode
		);
		if (result.length) {
			return res.status(eStatusCode.OK).send(result);
		} else {
			return res
				.status(eStatusCode.NOT_FOUND)
				.send(`No SubCategories present for ${categoryCode} category`);
		}
	} catch (error) {
		res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
	}
};
