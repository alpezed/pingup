import express from 'express';
import morgan from 'morgan';
import { APIError } from 'better-auth/api';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import 'dotenv/config';

import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import { auth } from './lib/auth.js';
import globalError from './controllers/error.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.all('*splat', (req, res, next) => {
	next(
		new APIError('NOT_FOUND', {
			message: `Can't find ${req.originalUrl} on the server!`,
		})
	);
});

app.use(globalError);

export default app;
