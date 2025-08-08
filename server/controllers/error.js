import { APIError } from "better-auth/api";

const globalError = (err, req, res, next) => {
	if (err instanceof APIError) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: {
				name: err.name,
				body: err.body,
				statusCode: err.statusCode,
			},
			message: err.message,
		});
	}
	res.status(500).json({ error: err });
};

export default globalError;
