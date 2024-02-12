import getCourierOrder from "~/lib/courierServices/getOrders/getAllOrders";
import sessionChecker from "~/lib/sessionPermission";
import dbConnect from "~/utils/dbConnect";


export default async function apiHandler(req, res) {
    const { method } = req;


    if (!(await sessionChecker(req, "order")))
        return res
            .status(403)
            .json({ success: false, message: "Access Forbidden" });

    await dbConnect();

    switch (method) {

        case "GET":
            try {
                var data = await getCourierOrder();
                return res.status(201).json(data);
            } catch (error) {
                console.log(error.response?.data);
                return res
                    .status(406)
                    .json({ success: false, message: error.response?.data.message || error.toString() });
            }


        default:
            return res
                .status(404)
                .json({ success: true });
    }

}

