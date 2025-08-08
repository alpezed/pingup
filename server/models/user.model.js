import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: null,
		},
		bio: {
			type: String,
			default: "",
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

// Example method to get user with specific fields
userSchema.statics.findPublicProfile = function (userId) {
	return this.findById(userId).select("username avatar bio createdAt");
};

// Example method to get user for admin purposes
userSchema.statics.findAdminProfile = function (userId) {
	return this.findById(userId).select("-password"); // Exclude password
};

const User = mongoose.model("User", userSchema);

export default User;
