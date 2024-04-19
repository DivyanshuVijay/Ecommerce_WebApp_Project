import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      //product's name
      type: String,
      required: true,
    },
    slug: {
      //to make this SEO friendly
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category", //to link it with the category collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      //here we are not using cloudinary to store photo, we are using just normal mongoDB to store images, it will have some limitation in terms of size of picture.
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
