import { useEffect } from "react";

const Razorpay = () => {

  useEffect(() => {
    loadRazorpay();
  }, []);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const options = {
      key: "YOUR_KEY_ID",
      amount: 50000,   // ₹500 → 50000 paise
      currency: "INR",
      name: "CrickSlot",
      description: "Turf Booking",
      image: "https://example.com/your_logo",

      order_id: "order_9A33XWu170gUtm", // normally from backend

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);

        // after success → call backend to verify & create booking
      },

      prefill: {
        name: "Brute",
        email: "brute@gmail.com",
        contact: "9999999999",
      },

      notes: {
        address: "Razorpay Corporate Office",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.reason);
    });

    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-6 py-3 rounded-lg"
    >
      Pay Now
    </button>
  );
};

export default Razorpay;
