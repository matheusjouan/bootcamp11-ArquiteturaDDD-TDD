import { Router } from 'express';
import authMiddleware from '@modules/users/infra/http/middlewares/auth';

import AppointmentsController from '../controllers/AppointmentsController';

// Instanciação do controller
const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

// Passa-se o método referente a esta rota
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
