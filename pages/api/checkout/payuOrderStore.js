import customId from "custom-id-new";
import tmpOrderModel from "~/models/tmpPrepaidOrder";
import dbConnect from "~/utils/dbConnect";

export default async function apiHandler(req, res) {
await dbConnect();

    const getTotalPrice = async (products) => {
        const price = await products.reduce(
            (accumulator, item) => accumulator + item.qty * item.price,
            0,
        );
        return Math.round(price * 10) / 10;
    };
  try {
                
                const {
                    coupon,
                    products,
                    billingInfo,
                    shippingInfo,
                    deliveryInfo,
                    paymentData,
                } = req.body;
                
                const totalPrice = await getTotalPrice(products);

                const payAmount =
                    deliveryInfo.cost +
                    Math.round((totalPrice - (coupon.discount / 100) * totalPrice) * 10) /
                    10;

                 const orderId = `R${customId({ randomLength: 4, upperCase: true })}`;
                const paymentStatus = "Unpaid";

                const orderData = {
                    orderId,
                    products,
                    status: "Process",
                    billingInfo,
                    shippingInfo,
                    deliveryInfo,
                    paymentMethod: paymentData.method,
                    paymentStatus,
                    paymentId: paymentData.id,
                    totalPrice,
                    payAmount,
                    coupon,
                };
console.log(orderData);
                const createdOrder = await tmpOrderModel.create(orderData);
                res.send({createdOrder: createdOrder.orderId});
                //res.status(200).json({ success: true, createdOrder });
            } catch (err) {
                console.log(err);
                res.status(500).json({ success: false });
            }

  
}