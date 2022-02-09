import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/users", userController.create);
router.get("/users/:id", userController.findById);
router.get("/users", userController.findAll);
router.put("/users/:id", userController.updateById);
router.delete("/users/:id", userController.deleteById);

export { router as userRouter };
