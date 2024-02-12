import cancelCourierOrder from "~/lib/courierServices/cancelCourierOrder";
import getCourierSpecificOrder from "~/lib/courierServices/getOrders/getSpecificOrder";
import sendCourierPickupRequest from "~/lib/courierServices/sendCourierPickupRequest";
import updateCourierPickupRequest from "~/lib/courierServices/updateCourierOrder";
import sessionChecker from "~/lib/sessionPermission";
import dbConnect from "~/utils/dbConnect";


export default async function apiHandler(req, res) {
    const { method } = req;


    if (!(await sessionChecker(req, "order")))
        return res
            .status(403)
            .json({ success: false, message: "Access Forbidden" });

    await dbConnect();

    const OrderId = req.query.id;
    const measurement = req.body;

    // { measurement Data Sets EX: 
    //"length": "",
    //"breadth": "",
    //"height": "",
    //"weight": "",
    // }

    switch (method) {

        case "POST":
            try {
                var data = await sendCourierPickupRequest(OrderId, measurement);
                return res.status(201).json({ success: true, ...data });
            } catch (error) {

                return res
                    .status(406)
                    .json({ success: false, message: error.response?.data.message || error.toString() });
            }

        case "PUT":
            try {
                var data = await updateCourierPickupRequest(OrderId, measurement);
                console.log(data);
                return res.status(200).json({ success: true, ...data });
            } catch (error) {
                return res
                    .status(406)
                    .json({ success: false, message: error.response?.data.message || error.toString() });
            }

        case "DELETE":
            try {
                var data = await cancelCourierOrder(OrderId);
                return res.status(200).json({ success: true, ...data });
            } catch (error) {
                return res
                    .status(406)
                    .json({ success: false, message: error.response?.data.message || error.toString() });
            }


        default:
            try {
                var data = await getCourierSpecificOrder(OrderId);
                return res.status(200).json(data);
            } catch (error) {
                return res
                    .status(406)
                    .json({ success: false, message: error.response?.data.message || error.toString() });
            }
    }

}

