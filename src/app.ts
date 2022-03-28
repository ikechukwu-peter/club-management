import express, { Application } from "express";
// @ts-ignore
import rateLimit from "express-rate-limit";
//@ts-ignore
import helmet from "helmet";
//@ts-ignore
import xssclean from "xss-clean";
import passport from 'passport'
import cors from 'cors'
import authenticate from './config/passport';
import compression from "compression";
import userRoute from "./routes/user.route";
import clubRoute from "./routes/club.route";


const app: Application = express();

//Body parser, reading data from req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(xssclean());

//compress app
app.use(compression());

//CORS enable
app.use(cors());

app.use(passport.initialize());

// Passport Config
authenticate(passport)

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
app.use(apiLimiter);

// Routing
app.use("/user/", userRoute);
app.use("/club/", clubRoute);


export default app;