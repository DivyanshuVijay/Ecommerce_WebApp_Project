import React from "react";
import Layout from "./../components/Layout/Layout";

const PolicyPage = () => {
  return (
    <Layout title="Privacy and Policies">
      <header className="text-center">
        <h2>Privacy Policy</h2>
      </header>
      <section>
        <h3>Introduction</h3>
        <p>
          Welcome to Swank Clothing's Privacy Policy. Swank Clothing respects
          your privacy and is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and disclose your
          personal information when you visit our website or interact with us.
        </p>
      </section>
      <section>
        <h3>Collection of Information</h3>
        <p>
          We collect personal information that you provide to us voluntarily
          when you register an account, place an order, or contact us for
          support. This may include your name, email address, shipping address,
          and payment information. We also collect information automatically
          when you visit our website, such as your IP address, browser type, and
          device information.
        </p>
      </section>
      <section>
        <h3>Use of Information</h3>
        <p>
          We use the information we collect to process your orders, communicate
          with you, improve our website, and personalize your shopping
          experience. We may also use your information to send you promotional
          offers and marketing communications, which you can opt out of at any
          time.
        </p>
      </section>
      <section>
        <h3>Updates to this Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this Privacy Policy periodically
          for any updates.
        </p>
      </section>
      <section>
        <h3>Security</h3>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, disclosure, alteration, or destruction. However,
          no method of transmission over the internet or electronic storage is
          completely secure, so we cannot guarantee absolute security.
        </p>
      </section>
      <footer>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at privacy@swankclothing.com.
        </p>
      </footer>
    </Layout>
  );
};

export default PolicyPage;
