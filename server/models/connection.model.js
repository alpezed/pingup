import { mongoose } from "mongoose";

const connectionSchema = new mongoose.Schema(
	{
		from_id: {
			type: String,
			required: true,
		},
		to_id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

connectionSchema.index({ from_id: 1, to_id: 1 }, { unique: true });

connectionSchema.statics.isConnected = async function (fromId, toId) {
	const connection = await this.exists({
		from_id: fromId,
		to_id: toId,
		status: "accepted",
	});
	return connection;
};

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
