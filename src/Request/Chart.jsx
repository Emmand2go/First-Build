import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chart() {
  // const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stages = [
    { label: "Payment Confirmed", value: 25 },
    { label: "Cutting", value: 50 },
    { label: "Sewing", value: 75 },
    { label: "Ready for Pickup", value: 100 }
  ];

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_BASE_URL}/api/orders/${orderId}`)
  //     .then(res => {
  //       setOrder(res.data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, [orderId]);

useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
console.log("Token from localStorage:", localStorage.getItem("token"));

      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/order/getorders`,
          {
            headers: { "Authorization": `Bearer ${token}` },
          }
        );
        

        // Ensure orders is always an array
        const ordersArray = Array.isArray(res.data) ? res.data : [res.data];
        setOrders(ordersArray);
      } catch (err) {
        console.error("Fetch error details:", err.response?.data || err.message);
        setError(err.response?.data?.message||"Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (loading) return <div className="loader">Loading your order...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!orders.length) return <p>Order not found.</p>;

  return (
    <div className="progress-page">
      {orders.map((order) => (
      <div className="card" key={order._id || order.paymentReference}>
        <h1>🧵 Order Progress</h1>

        <div className="order-info">
          <p><strong>Customer:</strong> {order.name || "unknown"}</p>
          <p><strong>Status:</strong> {order.status || "pending"}</p>
          <p><strong>Delivery:</strong>{""} {order.deliveryDate? new Date(order.deliveryDate).toDateString(): "TBD"}</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${order.progress || 0}%` }}
            />
          </div>
          <span>{order.progress || 0}% Complete</span>
        </div>

        <ul className="stage-list">
          {stages.map(stage => (
            <li
              key={stage.value}
              className={order.progress >= stage.value ? "completed" : ""}
            >
              {order.progress >= stage.value ? "✔" : "○"} {stage.label}
            </li>
          ))}
        </ul>
      </div>
      ))}
    </div>
  );
}



 


    // useEffect(() => {
  //        // Get the token from localStorage for authorization
  //       const token = localStorage.getItem("token");
  // // let reference = sessionStorage.getItem("paymentRef");

  // // if (!reference) {
  // // reference = sessionStorage.getItem("price");
  // //   setLoading(false);
  // //   return;
  // // }

  //     axios
  //     .get(`${import.meta.env.VITE_BASE_URL}/api/orders/getorders`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       // ensure we always have an array
  //       const ordersArray = Array.isArray(data) ? data : [data];
  //       setOrder(ordersArray);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError("Failed to fetch orders.");
  //       setLoading(false);
  //     });
  // }, []);