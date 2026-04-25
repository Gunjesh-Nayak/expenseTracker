import userModel from "../models/user.model.js";
const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

export default {
  getUserDetails,
};