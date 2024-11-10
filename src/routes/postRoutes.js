import { Router } from "express";
import { newUserMiddlewareDTO } from "../middlewares/middlewaresDTO.js";
import { postNewUserController } from "../controllers/newUserController.js";
const postInitRoute = () => {
    const router = Router()
    router.post("/user", newUserMiddlewareDTO, postNewUserController)
    return router
}
export default postInitRoute