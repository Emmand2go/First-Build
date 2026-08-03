// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function Chart() {
//   // const { orderId } = useParams();
//   // const {email}= useParams();
//   // const email=localStorage.getItem("user.email")
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const stages = [
//     { label: "Payment Confirmed", value: 25 },
//     { label: "Cutting", value: 50 },
//     { label: "Sewing", value: 75 },
//     { label: "Ready for Pickup", value: 100 }
//   ];

//   // useEffect(() => {
//   //   axios.get(`${import.meta.env.VITE_BASE_URL}/api/orders/${orderId}`)
//   //     .then(res => {
//   //       setOrder(res.data);
//   //       setLoading(false);
//   //     })
//   //     .catch(() => setLoading(false));
//   // }, [orderId]);

// useEffect(() => {
//     const fetchOrders = async () => {
//       // if (!email) return;
//       // const orders=localStorage.getItem("user")
//       const token = localStorage.getItem("token");
// console.log("Token from localStorage:", localStorage.getItem("token"));

//       if (!token) {
//         setError("User not authenticated.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/order/getorders`,
//           {
//             headers: { "Authorization": `Bearer ${token}` },
//           }
//         );
        
// // FIX: Access the 'orders' property from your backend response
//       // Your backend sends { message: "...", orders: [] }
//       if (res.data && res.data.orders) {
//         setOrders(res.data.orders);
//       } else if (Array.isArray(res.data)) {
//         setOrders(res.data);
//       } else {
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Failed to fetch orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrders();
// }, []);

 


//   if (loading) return <div className="loader">Loading your order...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!orders.length) return <p>Order not found.</p>;

//   return (
//     <div className="progress-page">
//       {orders.map((order) => (
//       <div className="card" key={order._id || order.paymentReference}>
//         <h1>🧵 Order Progress</h1>

//         <div className="order-info">
//           <p><strong>Customer:</strong> {order.name || "unknown"}</p>
//           <p><strong>Status:</strong> {order.status || "pending"}</p>
//           <p><strong>Delivery:</strong>{""} {order.deliveryDate? new Date(order.deliveryDate).toDateString(): "TBD"}</p>
//         </div>

//         <div className="progress-container">
//           <div className="progress-bar">
//             <div
//               className="progress-fill"
//               style={{ width: `${order.progress || 0}%` }}
//             />
//           </div>
//           <span>{order.progress || 0}% Complete</span>
//         </div>

//         <ul className="stage-list">
//           {stages.map(stage => (
//             <li
//               key={stage.value}
//               className={order.progress >= stage.value ? "completed" : ""}
//             >
//               {order.progress >= stage.value ? "✔" : "○"} {stage.label}
//             </li>
//           ))}
//         </ul>
//       </div>
//       ))}
//     </div>
//   );
// }


// ...existing code...
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chart.css"

export default function Chart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const stages = [
    { label: "Payment Confirmed", value: 25 },
    { label: "Cutting", value: 50 },
    { label: "Sewing", value: 75 },
    { label: "Ready for Pickup", value: 100 }
  ];

  const fetchOrders = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    console.debug("Chart.fetchOrders - token:", !!token);

    if (!token) {
      setError("User not authenticated. Please login.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/order/getorders`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        }
      );

      console.debug("Chart.fetchOrders - response:", res.data);

      // Support multiple possible shapes:
      // { orders: [...] }  OR  [...]  OR  { order: {...} }
      if (res.data && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (res.data && res.data.order) {
        setOrders([res.data.order]);
      } else if (res.data && res.data.orders === undefined && Object.keys(res.data).length) {
        // backend sent a single object with fields
        setOrders([res.data]);
      } else {
        setOrders([]);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.info("Chart.fetchOrders - request cancelled");
        return;
      }

      console.error("Chart.fetchOrders - error:", err?.response || err.message || err);
      const status = err.response?.status;
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      if (status === 401) {
        setError("Unauthorized. Please login again.");
        // optional: clear credentials and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/"), 800);
      } else {
        setError(
          serverMsg
            ? `Server error (${status || "unknown"}): ${serverMsg}`
            : `Failed to fetch orders${status ? ` (status ${status})` : ""}. Check console.`
        );
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal);
    return () => controller.abort();
  }, [fetchOrders]);

  if (loading) return <div className="loader">Loading your order...</div>;
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => fetchOrders()}>Retry</button>
      </div>
    );
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div className="progress-page">
      {orders.map((order) => (
        <div className="card" key={order._id || order.paymentReference}>
          <h1>🧵 Order Progress</h1>

          <div className="order-info">
            <p>
              <strong>Customer:</strong> {order.name || "unknown"}
            </p>
            <p>
              <strong>Status:</strong> {order.status || "pending"}
            </p>
            <p>
              <strong>Delivery:</strong>{" "}
              {order.deliveryDate ? new Date(order.deliveryDate).toDateString() : "TBD"}
            </p>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${order.progress || 0}%` }} />
            </div>
            <span>{order.progress || 0}% Complete</span>
          </div>

          <ul className="stage-list">
            {stages.map((stage) => (
              <li key={stage.value} className={order.progress >= stage.value ? "completed" : ""}>
                {order.progress >= stage.value ? "✔" : "○"} {stage.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
// ...existing code...



 

 //       // Ensure orders is always an array
  //       const ordersArray = Array.isArray(res.data) ? res.data : [res.data];
  //       setOrders(ordersArray);
  //     } catch (err) {
  //       console.error("Fetch error details:", err.response?.data || err.message);
  //       setError(err.response?.data?.message||"Failed to fetch orders.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);


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