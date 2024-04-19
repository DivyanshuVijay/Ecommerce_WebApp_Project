import slugify from "slugify";
import categorySchema from "../models/categorySchema.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body; //destructuring
    if (!name) {
      res.status(401).send({ message: "Name is required!!" });
    }
    //checking that there is no existingCategory with same name
    const existingCategory = await categorySchema.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ message: `${name} category already exists!! ` });
    }

    //or nahi mili toh ek new category bana ke save kr denge
    const category = await new categorySchema({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category created successfully !!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categorySchema.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    ); //this new true is to update info, wrna update nahi hoga
    res.status(200).send({
      success: true,
      message: "Category Updated Succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category!!",
    });
  }
};

//get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categorySchema.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting all lists!!",
      error,
    });
  }
};

//get single category
export const singlecategoryController = async (req, res) => {
  try {
    const category = await categorySchema.findById({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got Single Category Successfully!!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting a category!!",
      error,
    });
  }
};

//delete a category controller
export const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categorySchema.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while deleting category!!",
      error,
    });
  }
};
