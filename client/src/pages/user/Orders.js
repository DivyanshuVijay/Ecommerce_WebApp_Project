import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth(); //creating instance

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => {
              return (
                <div className="border shadow">
                  <table>
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Orders</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{index + 1}</th>
                        <th>{order?.status + 1}</th>
                        <th>{order?.buyer.name}</th>
                        <th>{moment(order?.createdAt).fromNow()}</th>
                        <th>{order?.payment.Success ? "Success" : "Failed"}</th>
                        <th>{order?.products.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products?.map((p, i) => (
                      <div className="row mb-2 card flex-row p-3">
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <h5>{p.name}</h5>
                          <p>{p.description.substring(0, 50)}</p>
                          <h6> ₹ {p.price}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
