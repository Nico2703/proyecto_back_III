import express from "express";
import router from "./common/router.js";
import envsConfig from "../src/config/envs.config.js";
import { connectDB } from "../src/config/mongoDb.config.js";
import { customError } from "./common/errors/customError.js";
import { logger } from "./common/utils/logger.js";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(customError);

app.listen(envsConfig.PORT, () => {
    logger.info(`Servidor conectado en el puerto ${envsConfig.PORT}`);
});
