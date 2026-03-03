import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from 'cors';    
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

const app = express();

const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [], // Allowed origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions));

app.all('/api/auth/{*any}', toNodeHandler(auth));

const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});