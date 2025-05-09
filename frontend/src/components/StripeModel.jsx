import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../stripe";
import CheckoutForm from "../CheckoutForm";
import "../../Modal.css";

const StripeModal = ({ clientSecret, onClose }) => {
  if (!clientSecret) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default StripeModal;