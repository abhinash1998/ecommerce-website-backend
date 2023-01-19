import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import userRouter from './user.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
