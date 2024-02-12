import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import { dateFormat, fetchData } from "~/lib/clientFunctions";
import classes from "~/styles/orderTrack.module.css";

const OrderTrack = () => {
  const orderId = useRef("");
  const [orderData, setOrderData] = useState({});

  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  const trackOrder = async () => {
    try {
      const id = orderId.current.value.trim();
      if (id.length > 0) {
        const response = await fetchData(`/api/home/order-track?id=${id}`);
        if (response.order) {
          setOrderData(response.order);
        } else {
          toast.error("Invalid Reference");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
    <section className={classes.banner}>
    <div className="container">
      <h1>Track Your Order</h1>
      </div>
    </section>
      <HeadData title="Track Your Order" />
      <div className={classes.top}>
        <div className={classes.input}>
         
            <div className={classes.orderBg}>
              <input
                className="form-control"
                type="text"
                placeholder="Your order reference no"
                ref={orderId}
              />
              <button onClick={trackOrder}>Track your order</button>
            </div>
            
        </div>
        {orderData.orderId && detailsViewer()}
      </div>
    </>
  );

  function detailsViewer() {
    return (
        
      <div className="custom_container">
      <div className={classes.orderDetails}>
        <div className="card mb-5 border-0 shadow">
          <div className={classes.orderHead}>Order Details</div>
          <div className="card-body">
            <div className={classes.body}>
              <div className={`${classes.order_details} row`}>
                <div className="col-md-6 mt-0">
                  <h6>Order Details :</h6>
                    <ul className={classes.orderTableData}>
                        <li>Order Id:</li>
                        <li>{orderData.orderId}</li>
                        
                        <li>  Order Date :</li>
                        <li>{dateFormat(orderData.orderDate)}</li>
                        
                        <li>Payment Status :{" "}</li>
                        <li> 
                            {orderData.paymentStatus === "Unpaid" ? (
                                <span className={classes.orderStatus}>Unpaid</span>
                             ) : (
                                <span className={classes.paidStatus}>Paid</span>
                            )}
                        </li>
                         
                         
                        <li> Order Status:{" "}</li>
                        <li><span className={classes.orderStatus}>{orderData.status}</span></li>
                          
                        <li> Payment Method:</li>
                        <li>{orderData.paymentMethod}</li>
                           
                      
                    </ul>
              
                 
              
                  
                </div>
                <div className="col-md-6 mt-0">
                  <h6>Delivery Information :</h6>
                    <ul className={classes.orderTableData}>
                    
                        <li>Delivery Type:</li>
                        <li>{orderData.deliveryInfo.type}</li>
                        
                        <li>Delivery Area:</li>
                        <li>{orderData.deliveryInfo.area}</li>
                        
                        <li>Delivery Cost :{" "}</li>
                        <li>{currencySymbol + orderData.deliveryInfo.cost}</li>
                    
                    </ul>
                    
                    
                 
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Products</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.products.map((product, idx) => (
                      <tr key={idx + product._id}>
                        <th scope="row">{idx + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.qty}</td>
                        <td>{currencySymbol + product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={classes.payment_info}>
                <div>
                  <span>Sub Total</span>
                  <span>{currencySymbol + orderData.totalPrice}</span>
                </div>
                <div>
                  <span>Discount</span>
                  <span>
                    {currencySymbol +
                      decimalBalance(
                        orderData.totalPrice -
                          (orderData.payAmount - orderData.deliveryInfo.cost),
                      )}
                  </span>
                </div>
                <div>
                  <span>Delivery Charge</span>
                  <span>{currencySymbol + orderData.deliveryInfo.cost}</span>
                </div>
                <div>
                  <span>Total</span>
                  <span>{currencySymbol + orderData.payAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    );
  }
};

export default OrderTrack;
