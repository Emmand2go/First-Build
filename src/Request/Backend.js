// Verify payment from backend
app.post("/api/payments/verify", async (req, res) => {
  const { reference } = req.body;

  const paystackRes = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );

  const paystackData = await paystackRes.json();

  if (paystackData.status) {
    const order = await Order.findOneAndUpdate(
      { paymentRef: reference },
      {
        status: "Payment Confirmed",
        progress: 25
      },
      { new: true }
    );

    return res.json({ status: "success", orderId: order.id });
  } else {
    return res.json({ status: "failed" });
  }
});

// reg in paystack and get this:
// Public Key  (starts with pk_live_…)
// Secret Key  (starts with sk_live_…)