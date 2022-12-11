import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = ({ price, handleOrder, orderId }) => {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
                custom_id: orderId,
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(handleOrder);
        }}
        onCancel={() => alert("You cancelled payment.")}
        onError={(err) => alert("Error in payment: " + err)}
      />
    </PayPalScriptProvider>
  );
};

export default Payment;
