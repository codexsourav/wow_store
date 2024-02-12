import React, { useEffect, useRef, useState } from 'react';
import ccav from './ccavutil'; // Import the ccavutil.js file (make sure it's in the correct path)
import { useDispatch, useSelector } from "react-redux";
import classes from "~/styles/payment.module.css";
import customId from "custom-id-new";
import { toast } from "react-toastify";
import { postData } from '~/lib/clientFunctions';
import { useRouter } from 'next/router';


const CCAvenueForm = () => {
  const router = useRouter();
  var crypto = require('crypto');
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [orderIds, setOrderIds] = useState({ "orderId": "", "orderDocId": "" })
  const paymentForm = useRef(null)
  const { session } = useSelector((state) => state.localSession);
  const cartData = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const exchangeRate = settings.settingsData.currency.exchangeRate;


  useEffect(() => {
    if (cartData.items.length <= 0) {
      router.replace("/checkout")
    } else {
      if (orderIds.orderDocId != "" && orderIds.orderId != "") {
        paymentForm.current.submit();
      }
    }
  }, [orderIds])


  const handelFormSubmit = (e) => {
    e.preventDefault();
  }

  const price = cartData.items.reduce(
    (accumulator, item) => accumulator + item.qty * item.price,
    0
  );

  const discountPrice = cartData.deliveryInfo.cost + ((price - (cartData.coupon.discount / 100) * price) * 10) / 10;

  const trnId = "T" + customId({ randomLength: 4, upperCase: true });
  // const orderId = `R${customId({ randomLength: 4, upperCase: true })}`;

  var workingKey = '04DF3941276D4BBBFEA75FD8072C6B2D';
  var accessCode = 'AVQB03KH69CH16BQHC';

  // var data = "merchant_id=2799326&order_id=" + orderId + "&amount=" + discountPrice + "&currency=INR&redirect_url=" + process.env.NEXT_PUBLIC_URL + "/api/checkout/ccavResponseHandler&cancel_url=" + process.env.NEXT_PUBLIC_URL + "/api/checkout/ccavResponseHandler&language=EN&billing_name=" + cartData.billingInfo.fullName + "&billing_address=" + cartData.billingInfo.house + "&billing_city=" + cartData.billingInfo.city + "&billing_zip=" + cartData.billingInfo.zipCode + "&billing_country=" + cartData.billingInfo.country + "&billing_tel=" + cartData.billingInfo.phone + "&billing_email=" + cartData.billingInfo.email + "&merchant_param1=additional Info.&merchant_param2=additional Info.&merchant_param3=additional Info.&merchant_param4=additional Info.&merchant_param5=additional Info.&promo_code=&customer_identifier=&";

  // Init Payment Data Sets
  var data = `merchant_id=2799326
  &order_id=${orderIds.orderId}
  &amount=${discountPrice}
  &currency=INR
  &redirect_url=${process.env.NEXT_PUBLIC_URL}/api/checkout/ccavtransition
  &cancel_url=${process.env.NEXT_PUBLIC_URL}/api/checkout/ccavtransition
  &language=EN&billing_name=${cartData.billingInfo.fullName}
  &billing_address=${cartData.billingInfo.house}
  &billing_city=${cartData.billingInfo.city}
  &billing_zip=${cartData.billingInfo.zipCode}
  $billing_state=${cartData.billingInfo.state}
  &billing_country=${cartData.billingInfo.country}
  &billing_tel=${cartData.billingInfo.phone}
  &billing_email=${cartData.billingInfo.email}
  &delivery_name=${cartData.shippingInfo.fullName}
  &delivery_address=${cartData.shippingInfo.house}
  &delivery_city=${cartData.shippingInfo.city}
  &delivery_state=${cartData.shippingInfo.state}
  &delivery_zip=${cartData.shippingInfo.zipCode}
  &delivery_country=${cartData.shippingInfo.country}
  &delivery_tel=${cartData.shippingInfo.phone}
  &merchant_param1=${orderIds.orderDocId}
  &merchant_param2=${session?.user.email || cartData.billingInfo.email}
  &merchant_param3=${session?.user.id || ""}
  &merchant_param4=${session?.user.id ? "User" : "Gest"}
  `;
  // Generate Md5 hash for the key and then convert in base64 string
  var md5 = crypto.createHash('md5').update(workingKey).digest();
  var keyBase64 = Buffer.from(md5).toString('base64');
  // Initializing Vector and then convert in base64 string
  var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');
  var encRequest = ccav.encrypt(data, keyBase64, ivBase64);


  //   const handleFormSubmit = async (formbody) => {
  //     const encRequest = ccav.encrypt(formbody, keyBase64, ivBase64);
  //     const newFormBody = `<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="text" id="encRequest" name="encRequest" value="${encRequest}"><input type="text" name="access_code" id="access_code" value="${accessCode}"><script language="javascript">document.redirect.submit();</script></form>`;
  //     setFormBody(newFormBody);
  //   };
  // You might want to call handleFormSubmit with the actual data when the component mounts


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
        setOrderIds({ "orderId": order_id, "orderDocId": order_doc_id });
      } else {
        toast.error("Something Went Wrong (500)");
        setLoading(false)
      }
    } catch (err) {
      setLoading(false);
      setIsError(true);
      toast.error(`Something Went Wrong ${err}`);
      console.log(err);
    }
  };




  return (
    <div> 
      <div className="layout_top">
        <div className={classes.container}>
          <h2 className={classes.h2}>Pay Now</h2>
          <form id="nonseamless" method="post" name="redirect" ref={paymentForm} onSubmit={handelFormSubmit} action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
            <input type="hidden" id="encRequest" name="encRequest" value={encRequest} />
            <input type="hidden" name="access_code" id="access_code" value={accessCode} />
            <button className="sub_button" onClick={processTmpOrder} disabled={(loading && !isError)} type="button">
              {loading ? "Processing" : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CCAvenueForm;
