import order from "~/models/order";
import createNewCourierToken from "./CreateShipRocketCourierToken";
import axios from 'axios'

const cancelCourierOrder = async (OrderId) => {


    try {

        var apiToken = await createNewCourierToken();
        const orderData = await order.findOne({ "_id": OrderId });

        if (!orderData)
            throw new Error("Order Not Found");

        var data = JSON.stringify({
            "ids": [
                orderData.deliveryInfo.courierInfo?.order_id,
                orderData.deliveryInfo.courierInfo?.shipment_id
            ]
        });



        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            data: data
        };

        const courierCancelRequest = await axios(config);

        if (courierCancelRequest.data.status_code == 200) {
            await order.updateOne({ "_id": OrderId }, { $set: { "status": "Canceled" } })
        }

        return courierCancelRequest.data;

    } catch (error) {
        throw error
    }
}


export default cancelCourierOrder;