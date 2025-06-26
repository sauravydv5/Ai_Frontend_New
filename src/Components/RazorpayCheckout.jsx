import React from "react";
import axios from "axios";

const RazorpayCheckout = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    try {
      // 1. Create order from backend
      const { data } = await axios.post("http://localhost:3000/payment/order", {
        amount: 500, // Amount in rupees
      });

      const options = {
        key: "rzp_test_tNCWdVrA2X7cT9", // Replace with your Razorpay Test Key
        amount: data.amount,
        currency: data.currency,
        name: "AI Health Assistant",
        description: "Consultation Fee",
        order_id: data.id,
        handler: async function (response) {
          try {
            // 2. Verify payment on backend
            const verifyRes = await axios.post(
              "http://localhost:3000/payment/verify",
              {
                ...response,
                order_id: data.id,
              }
            );

            if (verifyRes.data.success) {
              alert("✅ Payment successful and verified!");
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("❌ Server error during verification.");
          }
        },
        prefill: {
          name: "Saurav Kumar",
          email: "saurav@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("❌ Payment order creation failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-xl rounded-xl">
        <h2 className="mb-4 text-xl font-bold">Book Your Consultation</h2>
        <p className="mb-4 text-gray-600">Pay ₹500 to confirm your booking</p>
        <button
          onClick={handlePayment}
          className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default RazorpayCheckout;
