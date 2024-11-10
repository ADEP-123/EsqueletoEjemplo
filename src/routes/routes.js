import { Router } from "express";
import { middlewareRateLimit } from "../middlewares/middlewareRateLimit.js";
import appToken from "../controllers/tokenGenerator.js";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware.js";
import postInitRoute from "./postRoutes.js";

const initApiRoutes = () => {
    const router = Router();
    router.use("/login", middlewareRateLimit, appToken)
    router.use("/testLog", middlewareRateLimit, authorizationMiddleware, (req, res, next) => {
        console.log(req.body);
        res.status(200).send({ status: true, message: "Prueba exitosa, recibido el jwt" })
    })
    //router.use("/get", middleware1, midleware2, getInitRoute());
    router.use("/post", middlewareRateLimit, postInitRoute());
    //router.use("/put", middleware1, midleware2, putInitRoute());
    //router.use("/delete", middleware1, midleware2, deleteInitRoute());
    return router
}

export default initApiRoutes