// here we will make 2 functions , one is to encrypt to hash it , another one is to decrypt and to compare
//import bcrypt, { hash } from "bcrypt";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//to compare password while logging in
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
