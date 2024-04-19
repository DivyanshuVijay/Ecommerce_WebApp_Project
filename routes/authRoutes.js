import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js"; //this is middleware we used to make routes protected

//router object
const router = express.Router();

//routing
//REGISTER || POST METHOD
router.post("/register", registerController); //registerController iski jagah callback function likhte hai but we are using MVC pattern thats directly ye yaha likh diya registerController iska function alag se controller me banaenge

//LOGIN || POST METHOD
router.post("/login", loginController);

//FORGOT PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

//DASHBOARD-  protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//DASHBOARD- protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//UPDATE USER PROFILE
router.put("/profile", requireSignIn, updateProfileController);

//GET USER ORDER || GET
router.get("/orders", requireSignIn, getOrdersController);
export default router;
