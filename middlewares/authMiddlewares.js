import JWT from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

//creating protected routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    //token ab header me authorization me hogaa
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    //jese hi decode ho jaaega toh bs next ko call krdo
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access -> for this we will just check ki jo user login/register hua hai uska role = 1, hai ya nahi
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user.role !== 1) {
      return res.send({
        success: true,
        message: "UnAuthorized Access,Only admin can add new products",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
