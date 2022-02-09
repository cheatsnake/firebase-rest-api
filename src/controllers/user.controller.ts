import { UpdateUserDto } from "dto/updateUser.dto";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const userData: UserModel = req.body;
            const userId = await userService.create(userData);

            return res.json({ id: userId });
        } catch (error) {
            console.log(error);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await userService.findAll();

            return res.json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.findById(id);

            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const userData: UpdateUserDto = req.body;
            const user = await userService.updateById(userData);

            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const message = await userService.deleteById(id);
            return res.status(200).json({ message });
        } catch (error) {
            console.log(error);
        }
    }
}
