import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState();

  //getProduct
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/products/get-product/${params.slug}`
        );
        setProduct(data?.product[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [params?.slug]);

  useEffect(() => {
    if (product?._id && product?.category?._id) {
      getSimilarProducts(product._id, product.category._id);
    }
  }, [product]);

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Smooth scroll function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling behavior
    });
  };

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/products/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300px"}
            width={"auto"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1>Similar Product</h1>
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> ₹ {p.price}</p>
                <button
                  class="btn btn-primary ms-1"
                  onClick={() => {
                    navigate(`/product/${p.slug}`);
                    scrollToTop();
                  }}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
