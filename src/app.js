import express from "express";
import router from "./common/router.js";
import envsConfig from "../src/config/envs.config.js";
import swaggerUiExpress from "swagger-ui-express";
import { connectDB } from "../src/config/mongoDb.config.js";
import { customError } from "./common/errors/customError.js";
import { logger } from "./common/utils/logger.js";
import { specs } from "./config/swagger.config.js";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(customError);

app.listen(envsConfig.PORT, () => {
    logger.info(`Servidor conectado en el puerto ${envsConfig.PORT}`);
});
