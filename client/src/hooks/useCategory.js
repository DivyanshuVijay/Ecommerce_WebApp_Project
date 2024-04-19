import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState();

  //get category
  const getCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-allcategory`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories); // Check the categories state
  }, [categories]);

  return categories;
}
