import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import classes from "~/components/Checkout/checkout.module.css";
import HeadData from "~/components/Head";
import ImageLoader from "~/components/Image";
import data from "~/data";

import { fetchData, postData } from "~/lib/clientFunctions";
import { resetCart, updateBillingData } from "~/redux/cart.slice";

const CheckoutNav = dynamic(() => import("~/components/Checkout/checkoutNav"));
const PaymentGatewayList = dynamic(() => import("~/components/Checkout/paymentGatewayList"));

const Checkout = () => {
  const cartData = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  const dispatch = useDispatch();
  const router = useRouter();
  const { session, status } = useSelector((state) => state.localSession);
  const [visibleTab, setVisibleTab] = useState(2);
  const [changeTab, setChangeTab] = useState(false);
  const [sameShippingAddressValue, setSameShippingAddressValue] =
    useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    type: "Local Delivery",
    cost: 0,
    area: "",
  });
  const [shippingChargeInfo, setShippingChargeInfo] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});
  const [preInfo, setPreInfo] = useState({
    billingInfo: {
      fullName: "",
      phone: "",
      email: "",
      house: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    shippingInfo: {
      fullName: "",
      phone: "",
      email: "",
      house: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [country1, setCountry1] = useState("India");
  const [country2, setCountry2] = useState("India");
  const fullName1 = useRef();
  const phone1 = useRef();
  const email1 = useRef();
  const house1 = useRef();
  const city1 = useRef();
  const state1 = useRef();
  const zip1 = useRef();
  const fullName2 = useRef();
  const phone2 = useRef();
  const email2 = useRef();
  const house2 = useRef();
  const city2 = useRef();
  const state2 = useRef();
  const zip2 = useRef();
  const deliveryLocation = useRef();
  const deliveryArea = useRef();
  const infoForm = useRef();

  const fullOrderData = {
    // "name": fullName1.current,
    cartData,
    preInfo,
  }
  
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, 
  minimumFractionDigits: 0, 
  }).format(value);

  useEffect(() => {
    async function fetchShippingCharge() {
      try {
        const response = await fetchData(`/api/home/shipping`);
        if (response.success) {
          setShippingChargeInfo(response.shippingCharge);
          if (response.address) {
            const { name, email, phone, house, city, state, zipCode, country } =
              response.address;
            const data = {
              fullName: name,
              phone,
              email,
              house,
              city,
              state,
              zipCode,
              country,
            };
            const preData = {
              billingInfo: data,
              shippingInfo: data,
            };
            setPreInfo(preData);
            setCountry1(country);
            setCountry2(country);
          } else {
            const { billingInfo, shippingInfo } = cartData;
            setPreInfo({ billingInfo, shippingInfo });
          }
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchShippingCharge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sameShippingAddress = (e) => {
    const isChecked = e.target.checked;
    setSameShippingAddressValue(isChecked);
  };

  const handleBillingInfo = (e) => {
    e.preventDefault();
    const billingAddressValue = {
      fullName: fullName1.current.value,
      phone: phone1.current.value,
      email: email1.current.value,
      house: house1.current.value,
      city: city1.current.value,
      state: state1.current.value,
      zipCode: zip1.current.value,
      country: country1,
    };
    setBillingInfo(billingAddressValue);
    sameShippingAddressValue
      ? (setShippingInfo(billingAddressValue), setVisibleTab(4))
      : setVisibleTab(3);
  };

  const handleSaveInfo = async () => {
    try {
      const report = infoForm.current.reportValidity();
      if (report) {
        const value = {
          phone: phone1.current.value,
          house: house1.current.value,
          city: city1.current.value,
          state: state1.current.value,
          zipCode: zip1.current.value,
          country: country1,
        };
        const resp = await postData("/api/address", value);
        resp.success
          ? toast.success("Address Saved Successfully")
          : toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();
    const shippingAddressValue = {
      fullName: fullName2.current.value,
      phone: phone2.current.value,
      email: email2.current.value,
      house: house2.current.value,
      city: city2.current.value,
      state: state2.current.value,
      zipCode: zip2.current.value,
      country: country2,
    };
    setShippingInfo(shippingAddressValue);
    setVisibleTab(4);
  };

  const setDeliveryLocation = () => {
    const loc = deliveryLocation.current.value;
    if (loc.length > 0) {
      if (loc === "International Delivery") {
        const deliveryData = {
          type: "International Delivery",
          cost: shippingChargeInfo.internationalCost,
          area: null,
        };
        setDeliveryInfo(deliveryData);
      } else {
        const deliveryData = {
          type: "Local Delivery",
          cost: 0,
          area: null,
        };
        setDeliveryInfo(deliveryData);
      }
    }
  };

  const setDeliveryArea = () => {
    const area = deliveryArea.current.value;
    const areaInfo = shippingChargeInfo.area.filter((item) =>
      area.includes(item._id)
    );
    if (area.length > 0) {
      const deliveryData = {
        type: "Local Delivery",
        cost: areaInfo[0].price,
        area: areaInfo[0].name,
      };
      setDeliveryInfo(deliveryData);
    }
  };

  const processDeliveryInfo = () => {
    if (deliveryInfo.cost || deliveryInfo.area) {
      setVisibleTab(2);
    }
  };

  const selectPaymentMethodTab = () => {
    setVisibleTab(5);
    setChangeTab(true);
    dispatch(updateBillingData({ billingInfo, shippingInfo, deliveryInfo }));
  };

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  const getTotalPrice = decimalBalance(
    cartData.items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    )
  );

  const discountPrice = decimalBalance(
    getTotalPrice - (cartData.coupon.discount / 100) * getTotalPrice
  );

  const agreeTerms = () => setTermsAgree(!termsAgree);

  const selectPaymentMethod = (e) => setPaymentMethod(e.target.value);
  const submitOrder = async () => {
    try {
      if (paymentMethod === "cod") {
        const data = {
          coupon: cartData.coupon,
          products: cartData.items,
          billingInfo,
          shippingInfo,
          deliveryInfo,
          paymentData: {
            method: "Cash On Delivery",
            id: null,
          },
        };
        const url = `/api/order/new`;
        const formData = new FormData();
        formData.append("checkoutData", JSON.stringify(data));
        const response = await postData(url, formData);
        response && response.success
          ? (dispatch(resetCart()),
            toast.success("Order successfully placed"),
            router.push(`/checkout/success/${response.createdOrder._id}`))
          : toast.error("Something Went Wrong (500)");
      } else {
        router.push(`/checkout/${paymentMethod}`);
      }
    } catch (err) {
      toast.error(`Something Went Wrong ${err}`);
      console.log(err);
    }
  };

  return (
    <>
      <HeadData title="Checkout" />
      <div className={classes.top}>
        <CheckoutNav
          tab={visibleTab}
          setTab={setVisibleTab}
          changeTab={changeTab}
        />
        <div className={classes.card}>
          <div style={{ display: visibleTab === 1 ? "block" : "none" }}>
            {deliveryTypeJsx()}
          </div>
          <div
            style={{
              display:
                visibleTab === 2 && cartData && cartData.items.length !== 0
                  ? "block"
                  : "none",
            }}
          >
            {billingInfoJsx()}
          </div>
          <div style={{ display: visibleTab === 3 ? "block" : "none" }}>
            {shippingInfoJsx()}
          </div>
          <div style={{ display: visibleTab === 4 ? "block" : "none" }}>
            {reviewJsx()}
          </div>
          <div style={{ display: visibleTab === 5 ? "block" : "none" }}>
            <PaymentGatewayList
              selectPaymentMethod={selectPaymentMethod}
              submitOrder={submitOrder}
              fullOrderData={{}}
              settings={settings.settingsData.paymentGateway}
            />
          </div>
        </div>
      </div>
    </>
  );

  function reviewJsx() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className={classes.info}>
              <h6>Billing info :</h6>
              <span>Full Name: {billingInfo.fullName}</span>
              <span>Phone: {billingInfo.phone}</span>
              <span>Email: {billingInfo.email}</span>
              <span>Address: {billingInfo.house}, {billingInfo.city}, {billingInfo.state}, {billingInfo.country} - {billingInfo.zipCode}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className={classes.info}>
              <h6>Shipping info :</h6>
              <span>Full Name: {shippingInfo.fullName}</span>
              <span>Phone: {shippingInfo.phone}</span>
              <span>Email: {shippingInfo.email}</span>
              <span>Address: {shippingInfo.house}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.zipCode}</span>
            </div>
          </div>
         {/* <div className="col-md-6">
            <div className={classes.info}>
              <h6>Delivery info :</h6>
              <span>Delivery Type: {deliveryInfo.type}</span>
              {deliveryInfo.area && (
                <span>Delivery Area: {deliveryInfo.area}</span>
              )}
              <span>
                Delivery Charges: {currencySymbol + deliveryInfo.cost}
              </span>
            </div>
          </div> */}
        </div>
        <h6 className="mt-3">Items In Your Cart :</h6>
        <div className={classes.cart_item_list}>
          {cartData.items.map((item, index) => (
            <div className={classes.cart_item} key={index}>
              <div className={classes.cart_container}>
                <span className={classes.cart_image}>
                  <ImageLoader
                    src={item.image[0].url}
                    height={50}
                    width={50}
                    alt={item.name}
                  />
                </span>
                <span className={classes.cart_disc}>
                  <b>{item.sku}</b>
                  <span>Qty: {item.qty}</span>
                  <span>
                    Price: { numberFormat(item.price) }
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <h6 className="mt-3">Order Summary :</h6>
        <div className={classes.price_description}>
          <span>
            Sub Total: { numberFormat(getTotalPrice)}
          </span>
          <span>Delivery: Free{/*{currencySymbol + deliveryInfo.cost}*/}</span>
          <span>
            Discount: { numberFormat(decimalBalance(getTotalPrice - discountPrice))}
          </span>
          <span>
            Total (Incl.VAT): { numberFormat(discountPrice + deliveryInfo.cost)}
          </span>
        </div>
        <div className={classes.terms}>
          <div className="py-2 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Check2"
              onClick={agreeTerms}
            />
            <label className="form-check-label" htmlFor="Check2">
              I agree to the{" "}
              <a href="/terms" target="_blank">
                Terms and Conditions
              </a>
              ,{" "}
              <a href="/return" target="_blank">
                Return Policy
              </a>{" "}
              &{" "}
              <a href="/privacy" target="_blank">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        <button
          className="mt-3"
          onClick={selectPaymentMethodTab}
          disabled={termsAgree ? false : true}
        >
          Continue
        </button>
      </div>
    );
  }

  function shippingInfoJsx() {
    return (
      <div>
        <form className={classes.checkout_form} onSubmit={handleShippingInfo}>
          <div className="mb-3">
            <label>Shipping Info</label>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Full Name*"
                ref={fullName2}
                required
                defaultValue={preInfo.shippingInfo.fullName}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="tel"
                    placeholder="Phone*"
                    ref={phone2}
                    required
                    defaultValue={preInfo.shippingInfo.phone}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="email"
                    placeholder="Email*"
                    ref={email2}
                    required
                    defaultValue={preInfo.shippingInfo.email}
                  />
                </div>
              </div>
            </div>
            <div className={classes.input}>
              <textarea
                className="form-control"
                placeholder="House/Street*"
                ref={house2}
                required
                rows="2"
                defaultValue={preInfo.shippingInfo.house}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="City*"
                    ref={city2}
                    required
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, area: e.target.value })}
                    defaultValue={preInfo.shippingInfo.city}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="State*"
                    ref={state2}
                    required
                    defaultValue={preInfo.shippingInfo.state}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="Post/Zip Code*"
                    ref={zip2}
                    required
                    defaultValue={preInfo.shippingInfo.zipCode}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <select
                    className="form-control"
                    onChange={(e) => setCountry2(e.target.value)}
                    required
                    value={country2}
                  >
                    <option value="">Select Country*</option>
                    {data.country.map((ct) => (
                      <option value={ct.name} key={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    );
  }

  function billingInfoJsx() {
    return (
      <div>
        {session && (
          <button className={classes.updateButton} onClick={handleSaveInfo}>
            Save Inforamtion
          </button>
        )}
        <form
          className={classes.checkout_form}
          onSubmit={handleBillingInfo}
          ref={infoForm}
        >
          <div className="mb-3">
            <label className={classes.billingInfo}>Billing Info</label>
            <div className={classes.input}>
              <input
                type="text"
                placeholder="Full Name*"
                ref={fullName1}
                required
                defaultValue={preInfo.billingInfo.fullName}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="tel"
                    placeholder="Phone*"
                    ref={phone1}
                    required
                    defaultValue={preInfo.billingInfo.phone}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="email"
                    placeholder="Email*"
                    ref={email1}
                    required
                    defaultValue={preInfo.billingInfo.email}
                  />
                </div>
              </div>
            </div>
            <div className={classes.input}>
              <textarea
                className="form-control"
                placeholder="House/Street*"
                ref={house1}
                required
                rows="2"
                defaultValue={preInfo.billingInfo.house}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="City*"
                    ref={city1}
                    required
                    defaultValue={preInfo.billingInfo.city}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="State*"
                    ref={state1}
                    required
                    defaultValue={preInfo.billingInfo.state}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="Post/Zip Code*"
                    ref={zip1}
                    required
                    defaultValue={preInfo.billingInfo.zipCode}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={classes.input}>
                  <select
                    className="form-control"
                    onChange={(e) => setCountry1(e.target.value)}
                    required
                    value={country1}
                  >
                    <option value="India" key="India" selected>
                      India
                    </option>
                    {data.country.map((ct) => (
                      <option value={ct.name}  key={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="py-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="Check1"
                onClick={sameShippingAddress}
              />
              <label className="form-check-label" htmlFor="Check1">
                Shipping address same as billing address
              </label>
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    );
  }

  function deliveryTypeJsx() {
    return (
      <><div>
        <div className="mb-3">


          <label>Select Delivery Area*</label>

          <select
            className="form-control mb-5 mt-3"
            defaultValue=""
            onChange={setDeliveryArea}
            ref={deliveryArea}
          >
            <option value="" disabled>
              Select Delivery Area*
            </option>
            {shippingChargeInfo.area?.map((ct, idx) => (
              <option value={ct._id} key={idx}>
                {ct.name}
              </option>
            ))}
          </select>
        </div>


      </div><button
        onClick={processDeliveryInfo}
        disabled={deliveryInfo.cost || deliveryInfo.area ? false : true}
      >
          Continue
        </button>



      </>

    );
  }
};

export default Checkout;
