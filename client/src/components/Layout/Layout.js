import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

//jaruri nahi ki sab pages ke liye titles, description , keywords diye hi ho ... to better ki koi default value assign krdo
Layout.defaultProps = {
  title: "E-Commerce App-Shopping kare",
  description: "Mern Stack Project",
  author: "Divyanshu Vijaywargiya",
  keywords: "mern, react, mongodb, nodejs",
};

export default Layout;
