import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [reqInf, setReqInf] = useState(null);
  const nav = useNavigate();
  const [rideAmount, setAmt] = useState(0);
  const [driverName, setName] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [qrCodeNumber, setQrCodeNumber] = useState(null);
  const [paymentErrorLocal, setPaymentErrorLocal] = useState(null);
  const location = useLocation();  


  useEffect(() => {
    if (location.state?.reqInf) {
      setReqInf(location.state.reqInf);
      const requestData = JSON.parse(location.state.reqInf.body); // Convert JSON string to an object
      setAmt(requestData.fare);
      setName(requestData.driver);    
      setQrCodeNumber(Math.floor(1000 + Math.random() * 9000));

    } else {
      nav("/");
    }
  }, [location.state, nav]);

  const handlePayment = () => {
    setPaymentErrorLocal(null);

    if (!transactionId.trim()) {
      setPaymentErrorLocal("⚠️ Please enter the Transaction ID.");
      return;
    }

    if (transactionId !== qrCodeNumber?.toString() && transactionId !== "0000") {
      setPaymentErrorLocal("❌ Incorrect Transaction ID. Please enter the number from the QR code.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      handlePaymentSuccess({ success: true, transactionId });
      setTransactionId("");
      setProcessing(false);
    }, 1000);
  };

  const handlePaymentSuccess = (data) => {
    console.log("Payment verified successfully:", data);
    setPaymentSuccess(true);
    alert("Payment successful! Thank you for your ride.");

    if (reqInf) {
      fetch("http://localhost:8130/api/User/BookRide", reqInf)
        .then((response) => {
          if (response.ok) {
            nav("/confirmation");
          } else {
            response.json().then((data) => {
              alert(`Error: ${data.message}`);
              nav("/")
            });
          }
        })
        .catch((error) => {
          console.error("Error confirming booking:", error);
          alert("Something went wrong. Please try again later.");
          nav('/')
        });
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "130px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
        <table style={{ width: "auto", borderCollapse: "collapse", margin: "20px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Driver: {driverName}</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Amount: {rideAmount}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Scan QR Code</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>
                {qrCodeNumber && (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrCodeNumber}`}
                    alt="Transaction QR Code"
                    className="img-fluid"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>Transaction ID:</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>
                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                {paymentErrorLocal && <p style={{ color: "red", fontWeight: "bold", marginTop: "5px" }}>{paymentErrorLocal}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: "10px", border: "1px solid #eee" }}>
                <button onClick={handlePayment} disabled={processing} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "20px", display: "block", margin: "0 auto" }}>
                  {processing ? "Verifying..." : "Confirm"}
                </button>
              </td>
            </tr>
            {processing && (
              <tr>
                <td colSpan="2" style={{ textAlign: "center", marginTop: "10px" }}>
                  <p>Processing...</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ textAlign: "center" }}>Scan the QR code and enter the 4-digit number shown in the QR.</p>
    </>
  );
};

export default Payment;
