import createNewCourierToken from "~/lib/courierServices/CreateShipRocketCourierToken";
import createShippingOrderData from "./ShippingDetails/createShipppingOrderData";
import order from '~/models/order';
import axios from 'axios'


const updateCourierPickupRequest = async (OrderId, measurement = null) => {

    // { measurement Data Sets EX: 
    //"length": "",
    //"breadth": "",
    //"height": "",
    //"weight": "",
    // }

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
            url: 'https://apiv2.shiprocket.in/v1/external/orders/update/adhoc',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            data: data
        };

        const courierPickupRequest = await axios(config);

        if (courierPickupRequest.data.success == true) {
            var data = await order.findOneAndUpdate({ "_id": OrderId },
                {
                    $set: {
                        "deliveryInfo.courierInfo": courierPickupRequest.data,
                        ...(measurement != null ? { "deliveryInfo.measurement": measurement } : null)
                    },
                });
        }

        return courierPickupRequest.data;

    } catch (error) {
        throw error;
    }
}


export default updateCourierPickupRequest;