import { catchAsync } from '../utils/catch-async.js';
import Connection from '../models/connection.model.js';

export const addConnection = catchAsync(async (req, res) => {
	// check if user has sent more than 20 requests in the last 24 hours
	const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
	const requestsCount = await Connection.countDocuments({
		from_id: req.user.id,
		to_id: req.body.id,
		createdAt: { $gt: twentyFourHoursAgo },
	});

	if (requestsCount > 20) {
		return res.status(400).json({
			success: false,
			message: 'You have sent too many requests in the last 24 hours',
		});
	}

	if (await Connection.isConnected(req.user.id, req.body.id)) {
		return res.status(200).json({
			success: true,
			message: 'You are already connected',
		});
	}

	if (!(await Connection.hasPendingRequest(req.user.id, req.body.id))) {
		await Connection.create({ from_id: req.user.id, to_id: req.body.id });
		return res.status(201).json({
			success: true,
			message: 'Connection request sent',
		});
	}

	res.status(200).json({
		success: true,
		message: `You have a pending connection request`,
	});
});

export const getAllConnections = catchAsync(async (req, res) => {
	let filter = {};
	if (req.query.status) {
		filter = { status: req.query.status };
	}

	const query = { from_id: req.user.id, ...filter };

	const [connections, total] = await Promise.all([
		Connection.find(query),
		Connection.countDocuments(query),
	]);

	res.json({
		success: true,
		total,
		data: connections,
	});
});
