import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productPerPageController,
  productPhotoController,
  productSearchController,
  relatedProductController,
  updateProductController,
} from "../controllers/productControllers.js";
import formidable from "express-formidable"; //we can use this as a middleware

const router = express.Router();

//routes
router.post(
  "/create-product/",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-products", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//product photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter products
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/products-list/:page", productPerPageController);

//product search
router.get("/search/:keywords", productSearchController); //keywords as  params

//Similar products
router.get("/related-products/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
