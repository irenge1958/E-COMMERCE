import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef(null);
  const amountRef = useRef(amount); // Track latest amount without re-rendering

  useEffect(() => {
    amountRef.current = amount; // Update the ref whenever amount changes
  }, [amount]);

  useEffect(() => {
    // Ensure PayPal SDK is loaded
    if (!window.paypal) {
      console.error("PayPal SDK not loaded. Ensure you have included the PayPal script.");
      return;
    }

    // Render PayPal Buttons only once
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        console.log("Creating order with updated amount:", amountRef.current);

        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: amountRef.current.toString() // Use the latest amount from the ref
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          console.log(details)
          onSuccess(details);
        });
      },
      onError: (err) => {
        console.error("PayPal Buttons onError:", err);
      }
    }).render(paypalRef.current);

  }, []); // Run only once on initial render

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
