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
    if (users) res.send(users);
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : (error as string));
  }
};

// get a single user
const userProfile = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModal.findById(id);

    if (user) res.send(user);
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : (error as string));
  }
};

// delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteOne = await User.findByIdAndDelete(id);
    if (deleteOne) {
      res.status(201).json({ message: "User deleted successfully" });
    } else {
      throw new Error("The user not found");
    }
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : (error as string));
  }
};

// update a user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, mobile } = req.body;

    const updateUser = await User.findByIdAndUpdate(id, {
      first_name,
      last_name,
      email,
      mobile,
    }, { new: true });
    if (updateUser) {
      res.status(201).json(updateUser);
    } else {
      throw new Error("The user not found");
    }
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : (error as string));
  }
};

export { addUser, loginUser, allUsers, userProfile, deleteUser, updateUser };
