import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const secret = process.env.JWT_SECRET || "";

export const register = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  User.findOne({ email })
    .then((existingUser): any => {
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      return User.create({ name, email, password, role });
    })
    .then((newUser) => {
      if (newUser) {
        res.status(201).json({ message: "User registered", user: newUser });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", error: err.message });
    });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        secret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login successful", token });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error", error: err.message });
    });
};
