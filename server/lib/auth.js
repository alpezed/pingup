import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin } from 'better-auth/plugins';

import resend from '../config/resend.js';
import db from '../config/db.js';

export const auth = betterAuth({
	database: mongodbAdapter(db),
	plugins: [admin()],
	secret: process.env.BETTER_AUTH_SECRET,
	appName: 'pingup',
	baseURL: process.env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }) => {
			resend.emails.send({
				from: 'PingUp <edalpez@eddev.dev>',
				to: user.email,
				subject: 'Reset your password',
				html: `Click the link to reset your password: ${url}`,
			});
		},
	},
	user: {
		modelName: 'users',
		additionalFields: {
			username: {
				type: 'string',
				unique: true,
			},
			cover_photo: {
				type: 'string',
				defaultValue: '',
			},
			bio: {
				type: 'string',
				defaultValue: '',
			},
			location: {
				type: 'string',
				defaultValue: '',
			},
			followers: {
				type: 'string[]',
				required: false,
				defaultValue: [],
			},
			following: {
				type: 'string[]',
				required: false,
				defaultValue: [],
			},
		},
	},
});
