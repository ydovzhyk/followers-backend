const { User } = require("../models/user");
const { Follower } = require("../models/follower");

const addUserData = async (req, res, next) => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let data = getRandomInt(2, 35);
  let subData = getRandomInt(3, 35);
  const avatarUrl = `https://robohash.org/${Math.random()
    .toString(data)
    .substring(subData)}.png?size=100x100`;

  const newUser = await User.create({ ...req.body, avatar: avatarUrl });
  if (Object.keys(newUser).length) {
    return res
      .status(201)
      .send({ message: `User ${newUser.user} added successfully` });
  }
};

const getUsers = async (req, res, next) => {
  const { followerId, page, filter } = req.body;
  // Pagination
  const limit = 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * limit;

  try {
    let query = {};
    if (filter === "follow") {
      query = { followersData: { $nin: [followerId] } };
    } else if (filter === "following") {
      query = { followersData: { $in: [followerId] } };
    }
    const users = await User.find(query).skip(skip).limit(limit);
    const count = await User.countDocuments(query);
    return res.status(201).send({
      users: users,
      followerId: followerId,
      countPage: Math.ceil(count / limit),
    });
  } catch (err) {
    next(err);
  }
};

const getFollower = async (req, res, next) => {
  const newFollower = await Follower.create({ usersFollowing: [] });
  const id = newFollower._id;
  return res.status(201).send({ followerId: id });
};

const updateUser = async (req, res, next) => {
  const { followerId, userId, following } = req.body;
  if (!following) {
    User.updateOne(
      { _id: userId },
      { $push: { followersData: followerId }, $inc: { followers: 1 } }
    )
      .then((result) => {
        return res.status(200).send({ message: `User updated successfully` });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    User.updateOne(
      { _id: userId },
      { $pull: { followersData: followerId }, $inc: { followers: -1 } }
    )
      .then((result) => {
        return res.status(200).send({ message: `User updated successfully` });
      })
      .catch((err) => {
        next(err);
      });
  }
};

module.exports = {
  addUserData,
  updateUser,
  getUsers,
  getFollower,
};
