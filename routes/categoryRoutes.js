import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  categoryController,
  createCategoryController,
  deletecategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/categoryControllers.js";

const router = express.Router();

//now here we can create routes
//Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Get All Category
router.get("/get-allcategory", categoryController);

//Get Single Category
router.get("/get-singlecategory/:slug", singlecategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deletecategoryController
);

export default router;
