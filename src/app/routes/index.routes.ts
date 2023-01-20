import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import categoryRouter from './category.routes';
import * as swaggerDocument from './swagger.json';
import userRouter from './user.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
