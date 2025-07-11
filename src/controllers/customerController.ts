import { Request, Response } from "express";
import User from "../models/userModel";

export const getAllCustomers = (req: Request, res: Response) => {
  User.find({ role: "customer" })
    .select("-password")
    .then((users) => {
      res.json(users);
    })
    .catch((err: Error) => {
      res.status(500).json({
        message: "Error fetching customers",
        error: err.message,
      });
    });
};
