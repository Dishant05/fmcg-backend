import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err || typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = {
      userId: decoded?.userId,
      role: decoded?.role,
    };
  });

  next();
};
