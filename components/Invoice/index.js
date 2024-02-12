import React from "react";
import { useSelector } from "react-redux";
import classes from "~/components/Checkout/checkout.module.css";
import { decimalBalance } from "~/lib/clientFunctions";
import ImageLoader from "../Image";

const Invoice = ({ data }) => {
  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  return (
    <div className={classes.confirmation}>
      <div className={`${classes.confirmation_heading} bdr-0 pb-0`}>
        {settings.settingsData.logo[0] && (
          <ImageLoader
            src={settings.settingsData.logo[0].url}
            width={166}
            height={60}
            alt={settings.settingsData.name}
            quality={100}
          />
        )}
        <h2>We have received your order</h2>
        <h7 className={classes.orderNo}>Order no# {data.orderId}</h7>
        {/* <p>A copy of your receipt has been send to {data.billingInfo.email}</p> */}
        <br />
      </div>
      <div className={`${classes.confirmation_body} pt-0 mt-0`}>
        <h5 className="mt-0">Delivery details</h5>
        <div className="row">
          <div className="col-md-6">
          <div className={classes.deliveryInfo}>
            <h7>Delivery for</h7>
            <ul>
                <li>
                    <div className={classes.name}>Name</div>
                    <div className={classes.dtls}>{data.billingInfo.fullName}</div>
                </li>
                 <li>
                    <div className={classes.name}>Phone no</div>
                    <div className={classes.dtls}>{data.billingInfo.phone}</div>
                </li>
                <li>
                    <div className={classes.name}>Address</div>
                    <div className={classes.dtls}>{`${data.billingInfo.house} ${data.billingInfo.state} ${data.billingInfo.zipCode} ${data.billingInfo.country}`}</div>
               </li>
            </ul>
            </div>


        
          </div>
          <div className="col-md-6">
             <div className={classes.deliveryInfo}>
                <ul>
                    <li>
                        <div className={classes.name}>Delivery method</div>
                        <div className={classes.dtls}>{data.deliveryInfo.type}</div>
                    </li>
                    <li className={classes.last}>
                        <div className={classes.name}>Payment method</div>
                        <div className={classes.dtls}>{data.paymentMethod}</div>
                    </li>
                </ul>
            </div>
          </div>
          
          
          
        </div>
        <h5>Order summary</h5>
        <div className={classes.cart_item_list}>
          {data.products.map((item, index) => (
            <div className={classes.cart_item} key={index}>
              <div className={classes.cart_container}>
                <span className={classes.cart_disc}>
                  <b>{item.brand}</b>
                  {item.color.name && <span>Color: {item.color.name}</span>}
                  {item.attribute.name && (
                    <span>{`${item.attribute.for}: ${item.attribute.name}`}</span>
                  )}
                  <span>Qty: {item.qty}</span>
                  <span>
                    Price: {currencySymbol}
                    {item.price}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.confirmation_pay}>
          <div>
            <span>Sub Total</span>
            <span>
              {currencySymbol}
              {decimalBalance(data.totalPrice)}
            </span>
          </div>
          <div>
            <span>Discount</span>
            <span>
              {currencySymbol}
              {decimalBalance(
                data.totalPrice - (data.payAmount - data.deliveryInfo.cost)
              )}
            </span>
          </div>
          <div>
            <span>Delivery Charge</span>
            <span>
              {currencySymbol}
              {data.deliveryInfo.cost}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>
              {currencySymbol}
              {decimalBalance(data.payAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
