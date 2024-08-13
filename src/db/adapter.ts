import * as mongoose from "mongoose";
import userSchema from "./user.schema";
import { hash } from "@node-rs/argon2";

type User = {
  username: string;
  email: string;
  hashedPassword: string;
  plan: "basic" | "pro" | "ultimate";
};

const dbPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://the-user-admin:${dbPassword}@nonote.t738c.mongodb.net/?retryWrites=true&w=majority&appName=nonote`;

mongoose.connect(uri);

const User = mongoose.model("User", userSchema);

const userAdapter = {
  getUser: async (username: string) => {
    return await User.findOne({ username }).lean();
  },
  setUser: async (user: User) => {
    await User.create(user);
  },
  deleteUser: async (username: string) => {
    await User.deleteOne({ username });
  },
};

async function createUser() {
  await User.create({
    username: "admin-nonote",
    hashedPassword: await hash("admin@nonote-1#2", {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }),
    email: "admin@nonote.com",
    plan: "ultimate",
  }).then(() => {
    console.log("done saving a user");
  });
}

export { createUser };

export default userAdapter;
