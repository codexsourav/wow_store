import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import classes from "~/styles/payment.module.css";
import customId from "custom-id-new";
import axios from "axios";
import { toast } from "react-toastify";
import {
  currencyConvert,
  discountPrice,
  postData,
} from "~/lib/clientFunctions";
import Spinner from "~/components/Ui/Spinner";

const PaymentComponent = () => {
  const crypto = require("crypto");
  const [self, setSelf] = useState();
  const [post, setPost] = React.useState(null);
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderIds, setOrderIds] = useState({ orderId: "", orderDocId: "" });
  const paymentForm = useRef(null);
  const [oncheckOpen, setOnCheckOpen] = useState(false);
  const cartData = useSelector((state) => state.cart);

  const [orderData, setOrderData] = useState({});
  const [hash, setHash] = useState({ hashId: "" });
  const [txtniddd, setTxtniddd] = useState();

  useEffect(() => {
    if (cartData.items.length <= 0) {
      router.replace("/checkout");
    } else {
      if (hash.hashId != "") {
        paymentForm.current.submit();
      }
    }
  }, [hash]);

  useEffect(() => {
    processTmpOrder();
  }, []);

  const handelFormSubmit = (e) => {
    e.preventDefault();
  };

  const price = cartData.items.reduce(
    (accumulator, item) => accumulator + item.qty * item.price,
    0
  );

  const discountPrice =
    cartData.deliveryInfo.cost +
    ((price - (cartData.coupon.discount / 100) * price) * 10) / 10;
  const trnId = "T" + customId({ randomLength: 4, upperCase: true });
  //const orderId = `R${customId({ randomLength: 4, upperCase: true })}`;

  //This method will generate the hashvalue

  // Create A Tmp Order
  const processTmpOrder = async () => {
    setLoading(true);
    try {
      const { coupon, items, billingInfo, shippingInfo, deliveryInfo } =
        cartData;
      const data = {
        coupon,
        products: items,
        billingInfo,
        shippingInfo,
        deliveryInfo,
        paymentData: {
          method: "Prepaid",
          id: trnId,
        },
      };

      const url = `/api/order/tmpprepaid`;
      const formData = new FormData();
      formData.append("checkoutData", JSON.stringify(data));
      const response = await postData(url, formData);

      //console.log(response);
      if (response && response.success) {
        const order_id = response.createdOrder.orderId;
        const order_doc_id = response.createdOrder._id;
        setOrderIds({ orderId: order_id, orderDocId: order_doc_id });

        try {
          const Subdata = {
            txnid: order_id, //String
            amount: discountPrice, //Float
            productinfo: "productinfo", //String
            firstname: cartData.billingInfo.fullName, //String
            email: cartData.billingInfo.email, //String
          };

          const reshash = await axios.post(
            "/api/checkout/payu",
            JSON.stringify(Subdata),
            { headers: { "Content-Type": "application/json" } }
          );
          const hashId = reshash.data.hash;
          setHash({ hashId: hashId });
        } catch (error) {
          console.log("Payment Error:" + error);
          //console.log("Payment Error:" + error.response.data);
        }
      } else {
        toast.error("Something Went Wrong (500)");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setIsError(true);
      toast.error(`Something Went Wrong ${err}`);
      console.log(err);
    }
  };

  var responseUrl = `${process.env.NEXT_PUBLIC_URL}/api/checkout/payuresponse`;

  return (
    <div>
      <div className="layout_top">
        <div className={classes.container}>
          {/* <h2 className={classes.h2}>Pay Now</h2> */}
          <Spinner />
          <br />
          <br />
          <h3>Payment Redirecting</h3>
          <form
            method="post"
            name="redirect"
            ref={paymentForm}
            onSubmit={handelFormSubmit}
            action="https://secure.payu.in/_payment"
          >
            <input type="hidden" name="key" value="WPBubxd5" />
            <input type="hidden" name="txnid" value={orderIds.orderId} />
            <input type="hidden" name="productinfo" value="productinfo" />
            <input type="hidden" name="amount" value={discountPrice} />
            <input
              type="hidden"
              name="email"
              value={cartData.billingInfo.email}
            />
            <input
              type="hidden"
              name="firstname"
              value={cartData.billingInfo.fullName}
            />
            <input
              type="hidden"
              name="lastname"
              value={cartData.billingInfo.fullName}
            />
            <input type="hidden" name="surl" value={responseUrl} />
            <input type="hidden" name="furl" value={responseUrl} />
            <input
              type="hidden"
              name="phone"
              value={cartData.billingInfo.phone}
            />
            <input type="hidden" name="hash" value={hash.hashId} />
            {/* <button
              className="sub_button"
              onClick={processTmpOrder}
              disabled={loading && !isError}
              type="button"
            >
              {loading ? "Processing" : "Pay Now"}
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
