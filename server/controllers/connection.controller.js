import { catchAsync } from '../utils/catch-async.js';
import Connection from '../models/connection.model.js';
import db from '../config/db.js';
import { ObjectId } from 'mongodb';

export const addConnection = catchAsync(async (req, res) => {
	// check if user has sent more than 20 requests in the last 24 hours
	const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
	const requestsCount = await Connection.countDocuments({
		from_user: req.user.id,
		to_user: req.body.id,
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
		await Connection.create({ from_user: req.user.id, to_user: req.body.id });
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

	const query = { from_user: req.user.id, ...filter };

	const [connections, total] = await Promise.all([
		Connection.find(query).populateUser('to_user'),
		Connection.countDocuments(query),
	]);

	res.status(200).json({
		success: true,
		total,
		data: connections,
	});
});

export const getConnectionCounts = catchAsync(async (req, res) => {
	const [totalConnections, pendingRequests, totalFollowers, totalFollowing] =
		await Promise.all([
			Connection.countDocuments({
				from_user: req.user.id,
				status: 'accepted',
			}),
			Connection.countDocuments({
				to_user: req.user.id,
				status: 'pending',
			}),
			db
				.collection('users')
				.aggregate([
					{ $match: { _id: new ObjectId(req.user.id) } },
					{ $project: { followersCount: { $size: '$followers' } } },
				])
				.toArray()
				.then(result => {
					console.log({ result });
					return result[0] ? result[0].followersCount : 0;
				}),
			db
				.collection('users')
				.aggregate([
					{ $match: { _id: new ObjectId(req.user.id) } },
					{ $project: { followingCount: { $size: '$following' } } },
				])
				.toArray()
				.then(result => {
					console.log({ result });
					return result[0] ? result[0].followingCount : 0;
				}),
		]);

	res.status(200).json({
		success: true,
		data: {
			connections: totalConnections,
			pending: pendingRequests,
			followers: totalFollowers,
			following: totalFollowing,
		},
	});
});
