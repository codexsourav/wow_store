import axios from 'axios';
import styles from './styles/measurement.module.css'
import { toast } from "react-toastify";

function MeasurementPopup({ data, setData }) {

    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };

    const handelFormData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = (data) => {
        return data.length == 0 && !isNaN(data)
    }


    const validateAndSendRequest = async () => {
        if (validate(data["length"]) || validate(data["breadth"]) || validate(data["height"]) || validate(data["weight"])) {
            toast.dismiss();
            toast.error('Invalid Measurement Data', toastConfig);
        } else {
            await createOrderRequest();
        }
    }


    const createOrderRequest = async () => {
        const toastId = toast.loading(" Please wait...")
        try {
            setData({ ...data, "loading": true })
            var options = {
                method: 'POST',
                url: process.env.NEXT_PUBLIC_URL + '/api/order/shipping/' + data.orderId,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                },
                data: {
                    length: parseFloat(data["length"]),
                    breadth: parseFloat(data["breadth"]),
                    height: parseFloat(data["height"]),
                    weight: parseFloat(data["weight"])
                }
            };

            const response = await axios.request(options);
            const responseData = response.data;
            setData({ ...data, "loading": false, "isRequestSend": true, "showPopup": false })
            toast.update(toastId, { render: `Pickup Request Send Shipment ID : ${responseData.shipment_id} `, type: "success", isLoading: false, ...toastConfig });

        } catch (error) {
            setData({ ...data, "loading": false })
            toast.update(toastId, { render: error.response?.data.message || error.toString(), type: "error", isLoading: false, ...toastConfig });
        }
    }



    return (
        <div className={styles.measurementPopup} >
            <div className={`${styles.measurementForm} container px-5 py-4`}>

                <h3 className="text-center mt-3">Add Parcel Measurement</h3>

                <div className="row">

                    <div className="col-12 col-md-6">
                        <div className="py-3">
                            <label className="form-label">
                                Parcel Length (cms)
                            </label>
                            <input
                                type="number"
                                disabled={data.loading}
                                value={data.length}
                                className="form-control"
                                name="length"
                                min={0.5}
                                onChange={(e) => handelFormData(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="py-3">
                            <label className="form-label">
                                Parcel Breadth (cms)
                            </label>
                            <input
                                type="number"
                                value={data.breadth}
                                className="form-control"
                                name="breadth"
                                min={0.5}
                                disabled={data.loading}
                                onChange={(e) => handelFormData(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="py-3">
                            <label className="form-label">
                                Parcel Height (cms)
                            </label>
                            <input
                                type="number"
                                value={data.height}
                                className="form-control"
                                name="height"
                                min={0.5}
                                disabled={data.loading}
                                onChange={(e) => handelFormData(e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="py-3">
                            <label className="form-label">
                                Parcel Weight (kgs)
                            </label>
                            <input
                                type="number"
                                value={data.weight}
                                className="form-control"
                                name="weight"
                                min={0.5}
                                disabled={data.loading}
                                onChange={(e) => handelFormData(e)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="float-end mt-3 mb-2">
                    <button class="btn btn-outline-danger me-2" type="button" onClick={() => setData({ ...data, "showPopup": false })}>Cancel</button>
                    <button class="btn btn-success me-2" type="button" disabled={data.loading} onClick={validateAndSendRequest}>Send Request</button>
                </div>
            </div>
        </div>
    )
}
export default MeasurementPopup