import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found "
              : `${values?.results.length} Products found`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((v) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${v._id}`}
                  className="card-img-top"
                  alt={v.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{v.name}</h5>
                  <p className="card-text">
                    {v.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {v.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
