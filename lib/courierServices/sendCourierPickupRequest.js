import createNewCourierToken from "~/lib/courierServices/CreateShipRocketCourierToken";
import createShippingOrderData from "./ShippingDetails/createShipppingOrderData";
import order from '~/models/order';
import axios from 'axios'


const sendCourierPickupRequest = async (OrderId, measurement) => {



    try {

        const orderData = await order.findOne({ "_id": OrderId });

        if (!orderData)
            throw Error("Order Not Found");

        if (!measurement) {
            throw Error("Add Product Measurement Data");
        }

        var data = await createShippingOrderData(orderData, measurement);

        var apiToken = await createNewCourierToken();

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            data: data
        };

        const courierPickupRequest = await axios(config);

        if (courierPickupRequest.data.shipment_id) {
            await order.findOneAndUpdate({ "_id": OrderId }, { $set: { "deliveryInfo.courierInfo": { success: true, ...courierPickupRequest.data }, "deliveryInfo.measurement": measurement, "status": "Shipped" } })
        }

        return courierPickupRequest.data;

    } catch (error) {
        console.log(error.response.data);
        throw error
    }
}


export default sendCourierPickupRequest;