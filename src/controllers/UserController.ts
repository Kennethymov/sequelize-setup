import { NextFunction, Request, Response } from "express";
import IUser from "../interface/IUser";
import UserService from "../services/UserService";

class UserController {
  private userService = new UserService();
  private req: Request;
  private res: Response
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public async getAll() {
    try {
      const users = await this.userService.getAll();
      return this.res.status(200).json(users);
    } catch (error) {
      this.next(error);
    }
  }
  
  public async create() {
    try {
      const user:IUser = this.req.body;
      const newUser = await this.userService.create(user);
      return this.res.status(201).json(newUser);
    } catch (error) {
      this.next(error);
    }
  }
    
};

export default UserController;
