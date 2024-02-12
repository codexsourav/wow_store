import order from "~/models/order";
import createNewCourierToken from "../CreateShipRocketCourierToken";
import axios from 'axios'

const getCourierSpecificOrder = async (orderId) => {


    try {
        var apiToken = await createNewCourierToken();
        const orderData = await order.findOne({ "orderId": orderId });

        if (!orderData)
            throw Error("Order Not Found");

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/orders/show/' + orderData.deliveryInfo.courierInfo?.order_id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
        };

        const getCourierOrderData = await axios(config);
        return getCourierOrderData.data;

    } catch (error) {
        throw error
    }
}


export default getCourierSpecificOrder;