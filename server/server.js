import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connect } from "./dbConn.js";
import cardRouter from './router/cardRoute.js';
import userRouter from './router/userRoute.js';
import { refreshTokenHandler } from './router/refreshTokenHandler.js'

const app = express();

/** middleware */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

/** Setting routes */
app.use('/card', cardRouter);
app.use('/refresh', refreshTokenHandler)
app.use('/user', userRouter);

/** Connecting to database */
connect().then(
    app.listen(3500, () => {
        console.log('App listening at localhost:3500/');
    })
).catch(error => {
    console.log("Couldn't connect to app");
    console.error(error);
}) 