import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
	{
		body: {
			type: String,
		},
		story_type: {
			type: String,
			enum: ["text", "image"],
			default: "text",
		},
		background_color: {
			type: String,
			default: "#ffffff",
		},
		image_url: {
			type: String,
			default: "",
		},
		likes: [
			{
				type: String,
			},
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		user: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
