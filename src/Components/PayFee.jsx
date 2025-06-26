import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Loader2, CheckCircle } from "lucide-react";

const PayFee = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch appointment data
  const fetchAppointment = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/appointments/${appointmentId}`, {
        withCredentials: true,
      });
      setAppointment(res.data.data);
    } catch (err) {
      console.error("Error fetching appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment initiation
  const initiatePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load.");

    try {
      const { data: order } = await axios.post(
        `${BASE_URL}/payment/order`,
        {
          amount: 500,
          appointmentId,
        },
        { withCredentials: true }
      );

      const options = {
        key: "rzp_test_tNCWdVrA2X7cT9", // Replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "AI Health Assistant",
        description: "Appointment Payment",
        order_id: order.id,
        handler: async function (response) {
          console.log("🧾 Razorpay Response:", response);

          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointmentId, // Optional if backend uses this to update DB
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              setPaymentSuccess(true);
              setTimeout(
                () => navigate("/patient-dashboard/myappointemet"),
                3000
              );
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Something went wrong during verification.");
          }
        },
        prefill: {
          name: "Saurav Kumar",
          email: "saurav@example.com",
          contact: "7277443664",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Something went wrong while creating order.");
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        Loading appointment...
      </div>
    );
  }

  // Payment success UI
  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-green-600">
        <CheckCircle className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="mt-2 text-gray-500">Redirecting to appointments...</p>
      </div>
    );
  }

  // Main UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">
          Pay Consultation Fee
        </h2>
        <p className="mb-4 text-center text-gray-600">
          Appointment ID: <span className="font-mono">{appointmentId}</span>
        </p>
        <p className="text-lg font-semibold text-center text-gray-800">
          Amount to Pay: ₹500
        </p>

        <button
          onClick={initiatePayment}
          className="w-full py-2 mt-6 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PayFee;
