import React from "react";
import Layout from "./../components/Layout/Layout";

const AboutPage = () => {
  return (
    <Layout title="About Us">
      <header>
        <h2 className="text-center">About Swank Clothing</h2>
      </header>
      <section>
        <h4>Our Story</h4>
        <p>
          At Swank Clothing, we believe in the power of self-expression through
          fashion. Founded in 2023, we set out with a vision to create
          high-quality, oversized streetwear t-shirts that not only look great
          but also make a statement. Our designs are inspired by urban culture,
          street art, and contemporary trends.
        </p>
      </section>
      <section>
        <h4>Our Mission</h4>
        <p>
          Our mission is to provide fashion-forward individuals with comfortable
          and stylish clothing that reflects their personality and attitude. We
          strive to offer a diverse range of designs and sizes to cater to the
          unique tastes and preferences of our customers.
        </p>
      </section>
      <section>
        <h4>Quality and Sustainability</h4>
        <p>
          At Swank Clothing, we are committed to producing clothing that not
          only looks good but also aligns with our values of sustainability and
          ethical practices. We carefully select materials and manufacturing
          processes that minimize environmental impact while ensuring the
          highest standards of quality.
        </p>
      </section>
      <section>
        <h4>Our Team</h4>
        <p>
          We are a team of passionate designers, creators, and fashion
          enthusiasts dedicated to bringing our vision to life. From concept
          development to production, each member of our team plays a vital role
          in delivering exceptional products and experiences to our customers.
        </p>
      </section>
      <section>
        <h4>Contact Us</h4>
        <p>
          If you have any questions, feedback, or just want to say hello, we'd
          love to hear from you! You can reach out to us via email at
          info@swankclothing.com or connect with us on social media.
        </p>
      </section>
      <footer>
        <p>
          Thank you for choosing Swank Clothing as your go-to destination for
          oversized streetwear. Stay stylish, stay swank!
        </p>
      </footer>
    </Layout>
  );
};

export default AboutPage;
