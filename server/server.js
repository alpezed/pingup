import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3001;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("DB connection successful!"));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
