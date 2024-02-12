import customId from "custom-id-new";
import tmpOrderModel from "~/models/tmpPrepaidOrder";
import dbConnect from "~/utils/dbConnect";
import { parseForm } from "~/utils/parseForm";

export const config = {
    api: {
        bodyParser: false,
    },
};


// Just Create A Temporary Order To Use Payment 

export default async function apiHandler(req, res) {
    const { method } = req;

    await dbConnect();

    const getTotalPrice = async (products) => {
        const price = await products.reduce(
            (accumulator, item) => accumulator + item.qty * item.price,
            0,
        );
        return Math.round(price * 10) / 10;
    };

    switch (method) {
        case "POST":
            try {
                const data = await parseForm(req);
                const { checkoutData } = data.field;
                const jsonData = await JSON.parse(checkoutData);
                const {
                    coupon,
                    products,
                    billingInfo,
                    shippingInfo,
                    deliveryInfo,
                    paymentData,
                } = jsonData;
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

                const createdOrder = await tmpOrderModel.create(orderData);

                res.status(200).json({ success: true, createdOrder });
            } catch (err) {
                console.log(err);
                res.status(500).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
