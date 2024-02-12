import { Basket3, Cart, Trash } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OutsideClickHandler from "~/components/ClickOutside";
import ImageLoader from "~/components/Image";
import { removeFromCart } from "~/redux/cart.slice";
import c from "./cartView.module.css";

import Image from 'next/image'

export default function CartView() {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(cart);
  const settings = useSelector((state) => state.settings);
  const { session } = useSelector((state) => state.localSession);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  const decimalBalance = (num) => Math.round(num * 10) / 10;
  
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, 
  minimumFractionDigits: 0, 
  }).format(value);
  // Getting the count of items
  const getItemsCount = () => {
    const p = cartData.items.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );
    return decimalBalance(p);
  };
  // Getting the total price of all items
  const getTotalPrice = () => {
    const p = cartData.items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    );
    return decimalBalance(p);
  };

  function gotoCheckout() {

    router.push("/checkout");

  }

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShowCart(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <li className="dropdown" onClick={() => setShowCart(true)}>
        <Link data-bs-toggle="dropdown" href="#">
          <Image src="/g1839.svg" width={26} height={26} alt="cats" />
          <span>{getItemsCount()}</span>
        </Link>
        {/*<p>Cart</p>*/}
        <ul className="dropdown-menu carDropdown" onClick={() => setShowCart(!showCart)}>
          <>
            {cartData.items && cartData.items.length === 0 ? (
              <li className='emptyCart'>
                <span>Your Cart is empty</span>
              </li>
            ) : (
              <>
                {cartData.items.map((item, index) => (
                  <li key={index} className={c.item}>
                    <div className={c.image}>
                      <Image
                        src={item.image[0].url}
                        height={90}
                        width={90}
                        alt={item.name}
                      />
                    </div>
                    <div className={c.content}>
                    <p>{item.brand} </p>
                      <p>{item.sku} </p>
                      <b>
                        {`${numberFormat(item.price)} (X${item.qty})`}
                      </b>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item.uid))}>
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </li>
                ))}


                <li className={c.total}>
                  <span>Total</span>
                  <span>
                    {numberFormat(getTotalPrice())}
                  </span>
                </li>
                <li className={c.btn_container}>
                  <Link href="/cart">View Cart</Link>
                  <button onClick={gotoCheckout}>Checkout</button>
                </li>

              </>
            )}
          </>
        </ul>
      </li>

    </>
  );
}
