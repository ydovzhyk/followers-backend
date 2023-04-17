const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "Name is required"],
    },
    tweets: {
      type: Number,
      required: [true, "Number is required"],
    },
    followers: {
      type: Number,
      required: [true, "Number is required"],
    },
    avatar: {
      type: String,
    },
    followersData: {
      type: [Object],
      required: false,
    },
  },
  { minimize: false }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const addUser = Joi.object({
  user: Joi.string().required(),
  tweets: Joi.number().required(),
  followers: Joi.number().required(),
  avatar: Joi.string(),
});

const followUser = Joi.object({
  followerId: Joi.string().required(),
  userId: Joi.string().required(),
  following: Joi.boolean().required(),
});

const userData = Joi.object({
  followerId: Joi.string().required(),
  page: Joi.string().required(),
  filter: Joi.string().required(),
});

module.exports = { User, addUser, followUser, userData };
