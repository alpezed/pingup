import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

likeSchema.index({ user: 1, post: 1 }, { unique: true });

likeSchema.statics.hasLiked = async function (userId, postId) {
	const like = await this.exists({
		user: userId,
		post: postId,
	});
	return like;
};

const Like = mongoose.model("Like", likeSchema);

export default Like;
