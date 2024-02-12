import ImageLoader from "../Image";
import classes from "./checkout.module.css";

const PaymentGatewayList = ({ selectPaymentMethod, submitOrder, settings, fullOrderData }) => {
  return (
    <div>
      <h6>Select a payment method :</h6>
      <div className={classes.payment_list}>
        {settings.cod && (
          <label className={`${classes.payment_card_label} ${classes.cash}`}>
            <input
              type="radio"
              name="payment_method"
              value="cod"
              defaultChecked
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <ImageLoader
                src="/images/cash-on-del-logo.png"
                width={100}
                height={50}
                alt="Cash On Delivery"
              />
            {/*  <span>Cash On Delivery</span>*/}
            </div>
          </label>
        )}
        {settings.paypal && (
          <label className={`${classes.payment_card_label}  ${classes.paypal}`}>
            <input
              type="radio"
              name="payment_method"
              value="paypal"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <ImageLoader
                src="/images/paypal-logo.png"
                width={100}
                height={50}
                alt="Paypal"
              />
            {/*  <span>Paypal</span> */}
            </div>
          </label>
        )}
        {settings.stripe && (
          <label className={`${classes.payment_card_label}  ${classes.stripe}`}>
            <input
              type="radio"
              name="payment_method"
              value="stripe"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <ImageLoader
                src="/images/stripe-logo.png"
                width={100}
                height={50}
                alt="Stripe"
              />
             {/* <span>Stripe</span>*/}
            </div>
          </label>
        )}
        {settings.sslCommerz && (
          <label className={`${classes.payment_card_label}  ${classes.ccavenue}`}>
            <input
              type="radio"
              name="payment_method"
              value="ccavenue"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card} style={{height:""}}>
              <ImageLoader
                src="/images/ccavenue.png"
                width={128}
                height={21}
                alt="CCAvenue"
              />
                 {/*<span>CCAvenue</span>*/}
            </div>
          </label>
        )}
        <label className={`${classes.payment_card_label}  ${classes.cmpOrder}`}>
            <input
              type="radio"
              name="payment_method"
              value="payu"
              checked
            />Pay Online
            <div className={classes.payment_card}>
              <img src="/images/payment-options.jpg" width='300' />
               {/*  <span>Payu</span> */}
            </div>
          </label>
        <button className="my-3" onClick={submitOrder}>
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default PaymentGatewayList;
