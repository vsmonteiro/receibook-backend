//Pattern Singleton
import User from "../models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class UserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    return res.json(user);
  }
}

export default new UserController();
