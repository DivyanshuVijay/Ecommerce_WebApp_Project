import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]); // Initialize category state with null
  const params = useParams();
  const navigate = useNavigate();

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-category/${params.slug}`
      );
      console.log(data);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getProductsByCategory();
    }
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">Category - {category?.name}</h3>
        <h6 className="text-center">{products?.length} Result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> ₹ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
