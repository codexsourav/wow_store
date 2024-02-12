import createNewCourierToken from "../CreateShipRocketCourierToken";
import axios from 'axios'

const getCourierOrder = async () => {


    try {

        var apiToken = await createNewCourierToken();

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://apiv2.shiprocket.in/v1/external/orders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },

        };

        const getCourierOrders = await axios(config);

        return getCourierOrders.data;

    } catch (error) {
        throw error
    }
}


export default getCourierOrder;