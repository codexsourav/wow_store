import { Basket3 } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postData } from "~/lib/clientFunctions";
import {
  applyCoupon,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "~/redux/cart.slice";
import ImageLoader from "../Image";
import classes from "./cartPage.module.css";

const CartPage = () => {
  const couponCode = useRef("");
  const cart = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const router = useRouter();
  const { session } = useSelector((state) => state.localSession);
  const decimalBalance = (num) => Math.round(num * 10) / 10;
  
   const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, 
  minimumFractionDigits: 0, 
  }).format(value);
  
  const getTotalPrice = decimalBalance(
    cart.items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    )
  );

  const discountPrice = decimalBalance(
    getTotalPrice - (cart.coupon.discount / 100) * getTotalPrice
  );

  const checkMaxQty = (uid) => {
    const product = cart.items.find((item) => item.uid === uid);
    if (product && product.quantity === -1) {
      return true;
    }
    return product && product.quantity >= product.qty + 1;
  };

  const increaseQty = (uid) => {
    if (checkMaxQty(uid)) {
      dispatch(incrementQuantity(uid));
    } else {
      toast.error("This item is out of stock!");
    }
  };

  const decreaseQty = (uid) => {
    dispatch(decrementQuantity(uid));
  };

  const validateCoupon = (data) => {
    const coupon = {
      code: data.code,
      discount: data.discount,
    };
    dispatch(applyCoupon(coupon));
  };

  const checkCoupon = async () => {
    try {
      const data = await postData("/api/order/coupon", {
        code: couponCode.current.value.trim(),
      });
      data && data.success
        ? (toast.success(data.message), validateCoupon(data))
        : toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  const checkoutProcess = () => {

    router.push("/checkout");

  };

  if (cart.items.length === 0) {
    return (
      <div className={classes.empty}>
        <Basket3 width={50} height={50} />
        <h1>Your cart is empty</h1>
        <Link href="/product">Back to shopping</Link>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <h1>Your Cart</h1>
      <div className={classes.header}>
        <p>Image</p>
        <p>Name</p>
        <p>MRP</p>
        <p>Quantity</p>
        <p>Total Cost</p>
        <p>Actions</p>
      </div>
      

      {cart.items.map((item, index) => (
        <div key={index} className={classes.body}>
          <div className={`${classes.image}`} data-name="Image">
            <div className={`${classes.checkoutImagHolder} ${classes.carTopImg}`}>
                <ImageLoader
                  src={item.image[0].url}
                  height={90}
                  width={90}
                  alt={item.name}
                />
            </div>
          </div>
          <div data-name="SKU">
         
            <span>SKU: {item.sku}</span>
            <span>{item.brand}</span>
           
          </div>
          <div data-name="Price">
            {numberFormat(item.price)}
          </div>
          <div data-name="Quantity">{item.qty}</div>
          
          <div data-name="Total Price">
            {numberFormat(decimalBalance(item.qty * item.price))}
          </div>
          <div className={classes.buttons} data-name="Actions">
            <button onClick={() => increaseQty(item.uid)}>+</button>
            <button onClick={() => decreaseQty(item.uid)}>-</button>
            <button onClick={() => dispatch(removeFromCart(item.uid))}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      ))}
      <div className={classes.card_container}>
        <div className={classes.card}>
          <p>Delivery Charges</p>
          <b>Free Of Cost</b>
        </div>
        <div className={classes.card}>
          <p>Sub Total</p>
          <b>
            {numberFormat(getTotalPrice)}
          </b>
        </div>
        <div className={classes.card}>
          <p>Discount</p>
          <b>
            {numberFormat(decimalBalance(getTotalPrice - discountPrice))}
          </b>
        </div>
        <div className={classes.card}>
          <p>Total (Incl. VAT)</p>
          <b>
            {numberFormat(discountPrice)}
          </b>
        </div>
      </div>
      <div className={classes.checkout_container}>
        <div className={classes.coupon}>
          <input
            type="text"
            ref={couponCode}
            defaultValue={cart.coupon.code}
            placeholder="Please enter promo code"
          />
          <button onClick={checkCoupon}>Apply Discount</button>
        </div>
        <div className={classes.checkout}>
          <button onClick={checkoutProcess}>Checkout</button>
          <Link href="/product">Back to shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
