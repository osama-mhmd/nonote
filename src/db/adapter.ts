import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import userSchema from "./user.schema";
import { sessionSchema } from "./session.schema";

const dbPassword = process.env.MONGODB_PASSWORD;
export const uri = `mongodb+srv://the-user-admin:${dbPassword}@nonote.t738c.mongodb.net/?retryWrites=true&w=majority&appName=nonote`;

await mongoose.connect(uri);

const User = mongoose.model("User", userSchema);

const Session = mongoose.model("Session", sessionSchema);

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

export default adapter;
