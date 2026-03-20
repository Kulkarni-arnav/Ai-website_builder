import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from 'cors';    
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { stripeWebhooks } from "./Controllers/StripeWebhooks.js";


const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [], // Allowed origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions));

app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

app.all('/api/auth/{*any}', toNodeHandler(auth));

const port = 3000;

app.use(express.json({limit: '50mb'})); 

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});