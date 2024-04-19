import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import ContactUsPage from "./pages/ContactUsPage.js";
import PolicyPage from "./pages/PolicyPage.js";
import PageNotFoundPage from "./pages/PageNotFoundPage.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Layout/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Layout/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import Users from "./pages/Admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import SearchPage from "./pages/SearchPage.js";
import ProductDetails from "./pages/ProductDetails.js";
import CategoriesPage from "./pages/CategoriesPage.js";
import CategoryProduct from "./pages/Admin/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
