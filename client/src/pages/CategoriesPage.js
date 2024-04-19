import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const CategoriesPage = () => {
  const categories = useCategory();

  if (!categories) {
    // Handle loading state if categories are still being fetched
    return (
      <Layout title={"Categories"}>
        <div className="container">
          <p>Loading categories...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default CategoriesPage;
