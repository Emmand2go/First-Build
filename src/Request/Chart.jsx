import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CustomerProgressPage.css";

export default function Chart() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tailoring workflow stages (UI logic only)
  const stages = [
    { label: "Payment Confirmed", value: 25 },
    { label: "Cutting", value: 50 },
    { label: "Sewing", value: 75 },
    { label: "Ready for Pickup", value: 100 }
  ];

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p>Loading order progress...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="progress-page">
      <h1>Tailoring Order Progress</h1>

      {/* Order Info */}
      <div className="order-info">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer Name:</strong> {order.name}</p>
        <p><strong>Cloth Type:</strong> {order.clothType}</p>
        <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${order.progress}%` }}
          />
        </div>
        <span className="progress-text">{order.progress}% Complete</span>
      </div>

      {/* Stage Tracker */}
      <ul className="stage-list">
        {stages.map(stage => (
          <li
            key={stage.value}
            className={order.progress >= stage.value ? "completed" : ""}
          >
            <span className="check">✔</span> {stage.label}
          </li>
        ))}
      </ul>
    </div>
  );
}


// Backend response
// {
//   "id": "ORD123",
//   "name": "Jane Doe",
//   "clothType": "Gown",
//   "deliveryDate": "2026-02-10",
//   "status": "Sewing",
//   "progress": 75
// }