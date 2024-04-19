import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select; //option ki help se dropdown menu bana paaenge

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams(); //url ko get krne ke liye ,we will use this
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-product/${params.slug}`
      );
      console.log(data);
      const product = data.product[0]; // Extract the first product object
      setId(product._id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setShipping(product.shipping);
      setCategory(product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-allcategory`
      );
      if (data?.success) {
        //means agar data milta hai toh usme success agar hai toh ye kro
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting category!!");
    }
  };

  //initial time life cycle ke liye we need to use useEffect hook
  useEffect(() => {
    getAllCategory();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-products`
      );
      // Update your state with fetched products data
      // Example:
      // setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products!");
    }
  };

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:8080/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error("Error occured while updating products!!");
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully!!");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Layout title={"Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 ">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/products/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="d-flex mb-3 w-75">
                <div className="mb-3 mt-3 mr-3 ">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update Product
                  </button>
                </div>
                <div className="m-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
