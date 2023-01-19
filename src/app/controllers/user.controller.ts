import { Request, Response } from 'express';
import { UserBLL } from '../bll/user.bll';
import { eErrorMessage } from '../enum/error-message.enum';
import { eStatusCode } from '../enum/status-code.enum';

export const signupUser = async (req: Request, res: Response) => {
	try {
		if (!Object.keys(req.body).length) {
			return res
				.status(eStatusCode.BAD_REQUEST)
				.send(eErrorMessage.FieldContent);
		}
		const result = await new UserBLL().signUpUser(req.body);
		if (result.status) {
			return res.status(eStatusCode.CREATED).send(result);
		} else {
			return res.status(eStatusCode.UNAUTHORIZED).send(result);
		}
	} catch (error) {
		return res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
	}
};

export const signinUser = async (req: Request, res: Response) => {
	try {
		if (!Object.keys(req.body).length) {
			return res
				.status(eStatusCode.BAD_REQUEST)
				.send(eErrorMessage.FieldContent);
		}
		const result = await new UserBLL().signinUser(req.body);
		if (result.status) {
			return res.status(eStatusCode.OK).send(result);
		} else {
			return res.status(eStatusCode.UNAUTHORIZED).send(result);
		}
	} catch (error) {
		return res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
	}
};
