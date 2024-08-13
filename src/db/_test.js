const mongoose = require("mongoose");

console.log("Testing `db`...\n");

const dbPassword = process.env.MONGODB_PASSWORD || "4TAvlYFFo2O0GoGo";
const uri = `mongodb+srv://the-user-admin:${dbPassword}@nonote.t738c.mongodb.net/?retryWrites=true&w=majority&appName=nonote`;

console.log("Connecting...\n");
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  hashedPassword: {
    type: String,
    require: true,
  },
  plan: {
    type: String,
    default: "basic",
  },
});

const User = mongoose.model("User", userSchema);

// async function watch() {
//   console.log("Watching database...");
//   // await User.watch();
//   console.log("test\n");
// }

// watch().then(() => console.log("Successfully ended watch!"));

mongoose.disconnect();
