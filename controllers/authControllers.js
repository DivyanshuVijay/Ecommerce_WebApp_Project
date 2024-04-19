import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import userSchema from "../models/userSchema.js";
import orderSchema from "../models/orderSchema.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    //destructuring the data
    const { name, email, phone, password, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!email) {
      return res.send({ message: "Email address is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //now we will check for existing user
    const existingUser = await userSchema.findOne({ email }); //on the basis of email find someone if existing
    if (existingUser) {
      res.status(200).send({
        success: message,
        message: "User Already Registered, Please Login!!",
      });
    }

    //now if we are here that means user is new
    //hashing the entered password
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userSchema({
      name,
      phone,
      email,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Registered Successfully!!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//LOGIN ...... POST Method
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; // destructing request's body
    //validation
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User doesn't exist with this email!",
      });
    }

    //if we are here toh lets compare password with the password stored in DB
    const match = await comparePassword(password, user.password);
    if (!match) {
      //if password match na ho toh
      return res.status(200).send({
        success: false,
        message: "Invalid email or password!",
      });
    }

    //creating token for log in
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(200).send({
      success: true,
      message: "Logged In Successfully!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while logging in!",
      error,
    });
  }
};

//forgot password controller
//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please Enter Email!!" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Please Enter Answer!!" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "Please Enter Password!!" });
    }

    //check
    const user = await userSchema.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Incorrect email or answer!!",
      });
    }

    // Hash the new password
    const hashedPasswordd = await hashPassword(newPassword);

    // Update the user's password with the new hashed password
    await userSchema.findByIdAndUpdate(user._id, { password: hashedPasswordd });

    res.status(200).send({
      success: true,
      message: "Password reset successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, password, address, email } = req.body;
    const user = await userSchema.findById(req.user._id);
    // //now we will check password
    // if (!password) {
    //   return res.json({ error: "Password is required and must be 6 characters long!!" });
    // }

    const hashedPassword = password ? await hashPassword(password) : undefined; //agar password milta hai toh usse hashpassword function me pass krdo wrna undefined means as it is chhod  do

    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name, //name milta toh change kr do else ji hai wahi rehne do
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully!!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update profile controller.",
      error,
    });
  }
};
//now we can use above function in profile page

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getOrdersController.",
      error,
    });
  }
};
