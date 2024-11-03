import type { Request, Response } from "express";
import User from "../models/UserModal";
import generateToken from "../config/jsonToken";
import UserModal from "../models/UserModal";

// register method
const addUser = async function (req: Request, res: Response) {
  const { email } = req.body;
  const checkUser = await User.findOne({ email });

  if (checkUser) throw new Error("The email already take up");

  const response = await User.create(req.body);

  if (response) res.send(response);
};

// login method
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    return res.status(200).json({
      _id: user?._id,
      email: user?.email,
      mobile: user?.mobile,
      first_name: user?.first_name,
      last_name: user?.last_name,
      isAdmin: user?.isAdmin,
      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Email or password is incorrect");
  }
};

// get all users
const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if(users) res.send(users)

  } catch (error) {
    throw new Error(error)
  }
};

// get a single user
const userProfile = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModal.findById(id);

    if (user) res.send(user);
  } catch (error: unknown) {
    throw new Error(error);
  }
};

// delete a user
// update a user

export { addUser, loginUser, allUsers, userProfile };
