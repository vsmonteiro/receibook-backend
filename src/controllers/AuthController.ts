//Pattern Singleton
import User from "../models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "");
    delete user.password;

    return res.json({
      user,
      token,
    });
  }
}

export default new AuthController();
