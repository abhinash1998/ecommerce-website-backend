import { Router } from 'express';
import {
	createCategory,
	getAllCategories,
	getAllCategoriesByCategoryCode
} from '../controllers/category.controller';
import storage from '../controllers/storage.controller';

const categoryRouter = Router();

categoryRouter.post('/', storage, createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/categories/:categoryCode', getAllCategoriesByCategoryCode);

export default categoryRouter;
