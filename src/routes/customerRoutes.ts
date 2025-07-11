import { Router } from "express";
import { getAllCustomers } from "../controllers/customerController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all users with role "customer" (admin only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticateToken, authorizeRoles("admin"), getAllCustomers);

export default router;
