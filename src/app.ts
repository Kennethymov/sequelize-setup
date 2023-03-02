import express, { Request, Response } from 'express';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';
import erroMiddleware from './middlewares/erroMiddleware';
import userRoute from './routes/userRoute';

const app = express();

app.use(express.json());

app.use(erroMiddleware);

app.use('/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Express + TypeScript + Sequelize')
});

export default app;
