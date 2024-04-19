import slugify from "slugify";
import productSchema from "../models/productSchema.js";
import fs from "fs";
import categorySchema from "../models/categorySchema.js";

export const createProductController = async (req, res) => {
  try {
    //we cant access photo directly , directly krenge toh bs string ko access krlega , actual value ya photo show nhai hogi , so for this we need to install a package (npm i express-formidable)
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //now we can access data like this with the help of formidables, and then destructure it
    const { photo } = req.files;

    //validation :
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required!!" });
      case !description:
        return res.status(500).send({ error: "Description is required!!" });
      case !price:
        return res.status(500).send({ error: "Price is required!!" });
      case !category:
        return res.status(500).send({ error: "Category is required!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required!!" });
      case photo && photo.size > 1000000: //photo size should be less than 1Mb
        return res
          .status(500)
          .send({ error: "Photo is required & it should be less than 1Mb!!" });
    }

    const products = new productSchema({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully!!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Creating product!!",
      error,
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productSchema
      .find({})
      .populate("category") //shows all info about category too
      .select("-photo")
      .sort({ createdAt: -1 }); //we can apply multiple filters with select... and we dont want photos at intial time , thats we are writing "-photo"... and as we can have so many products so we are setting limit upto 12 , means it will show only 12 products,, and sort it with the time they are created
    res.status(200).send({
      success: true,
      countTotal: products.length, //shows count of products
      message: "All products !!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting products!!",
      error: error.message,
    });
  }
};

//single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productSchema
      .find({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Got Single product successfully!!",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting a product!!",
      error,
    });
  }
};

//product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.pid)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Photo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting a photo!!",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting a product!!",
      error,
    });
  }
};

//update products
export const updateProductController = async (req, res) => {
  try {
    //we cant access photo directly , directly krenge toh bs string ko access krlega , actual value ya photo show nhai hogi , so for this we need to install a package (npm i express-formidable)
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; //now we can access data like this with the help of formidables, and then destructure it
    const { photo } = req.files;

    //validation :
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required!!" });
      case !description:
        return res.status(500).send({ error: "Description is required!!" });
      case !price:
        return res.status(500).send({ error: "Price is required!!" });
      case !category:
        return res.status(500).send({ error: "Category is required!!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required!!" });
      case photo && photo.size > 1000000: //photo size should be less than 1Mb
        return res
          .status(500)
          .send({ error: "Photo is required & it should be less than 1Mb!!" });
    }

    const products = await productSchema.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully!!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updating product!!",
      error,
    });
  }
};

//filter product controller
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {}; // It prepares an empty object args to hold filtering criteria based on the received parameters.
    if (checked.length > 0) args.category = checked; //If checked (likely an array of selected category IDs) has elements, it assigns args.category to checked. This will filter products by the selected categories.
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }; //If radio (likely an array representing a price range) has elements, it assigns args.price to an object with MongoDB query operators ($gte for greater than or equal to and $lte for less than or equal to). This will filter products by the selected price range.
    const products = await productSchema.find(args); //It uses productModel.find(args) to query the database for products that match the specified criteria (args).
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

//product count controller
export const productCountController = async (req, res) => {
  try {
    const total = await productSchema.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Product Count.",
      error,
    });
  }
};

//product per page
export const productPerPageController = async (req, res) => {
  try {
    const perPage = 9;
    const page = req.params.page ? req.params.page : 1; //agar mila toh thik wrna value 1 rakhdo
    const products = await productSchema
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Product per page controller.",
      error,
    });
  }
};

export const productSearchController = async (req, res) => {
  try {
    const { keywords } = req.params;
    console.log("Received keywords:", keywords);

    const result = await productSchema
      .find({
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { description: { $regex: keywords, $options: "i" } },
        ],
      })
      .select("-photo");

    console.log("Search result:", result);

    if (!result || result.length === 0) {
      return res.json([]); // Return an empty array if no results are found
    }

    res.json(result);
  } catch (error) {
    console.log("Error in product search controller:", error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product Controller.",
      error: error.message, // Send specific error message back to client
    });
  }
};

//related product controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productSchema
      .find({
        category: cid,
        _id: { $ne: pid }, //jo product open hai usko related products me nahi dikhana, $ne mtlb isko include nahi krna .... and niche limit(5) mtlb 5 hi related products dikhane hai
      })
      .select("-photo")
      .limit(5)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related products.",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categorySchema.findOne({ slug: req.params.slug });
    if (!category) {
      // Handle case where category with given slug is not found
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }

    const products = await productSchema
      .find({ category })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product in productCategoryController.",
      error,
    });
  }
};
