import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", authenticateToken, authorizeRoles("admin"), createProduct);
router.put("/", authenticateToken, authorizeRoles("admin"), updateProduct);
router.delete("/", authenticateToken, authorizeRoles("admin"), deleteProduct);

export default router;
