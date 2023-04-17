const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const followerSchema = new Schema(
  {
    usersFollowing: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { minimize: false }
);

followerSchema.post("save", handleSaveErrors);

const Follower = model("follower", followerSchema);

module.exports = { Follower };
