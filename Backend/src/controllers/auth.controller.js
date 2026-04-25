// import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]

    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist...",
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,

    });

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET);

    res.cookie("Token", token, {
  httpOnly: true,
  secure: false,        // true in production (HTTPS)
  sameSite: "lax",      // important for localhost
});

    res.status(201).json({
        message: "user registered successfully...",
        user,
    })

}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "inavlid credential..."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "inavlid credential..."
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie("Token", token, {
  httpOnly: true,
  secure: false,        // true in production (HTTPS)
  sameSite: "lax",      // important for localhost
});
    res.status(200).json({
        message: "login successfull...",
        user
    });




}
export default { registerUser, loginUser }