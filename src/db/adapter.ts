import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import userSchema from "./user.schema";

const dbPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://the-user-admin:${dbPassword}@nonote.t738c.mongodb.net/?retryWrites=true&w=majority&appName=nonote`;

await mongoose.connect(uri);

const User = mongoose.model(
	"User",
	userSchema
);

const Session = mongoose.model(
	"Session",
	new mongoose.Schema(
		{
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			expires_at: {
				type: Date,
				required: true
			}
		} as const,
		{ _id: false }
	)
);

const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);

export {
  adapter
}