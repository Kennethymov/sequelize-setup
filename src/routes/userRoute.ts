import express, { NextFunction, Request, Response } from 'express';
import UserController from "../controllers/UserController";

const userRoute = express.Router();

userRoute.get(
    '/getAll',
    (req: Request, res: Response, next: NextFunction) => new UserController(req, res, next).getAll()
);

userRoute.post(
    '/create',
    (req: Request, res: Response, next: NextFunction) => new UserController(req, res, next).create()
);

export default userRoute;
