import tabelclasses from "~/components/tableFilter/table.module.css";
import {
    Truck
} from "@styled-icons/bootstrap";
import GlobalModal from "~/components/Ui/Modal/modal";
import axios from 'axios'
import { useState } from "react";
import { toast } from "react-toastify";

const CancelOrderPopup = ({ isOpen, setIsOpen, orderId }) => {

    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };


    const [loading, setLoading] = useState(false)

    // handel cancel order 
    const cancelThisOrder = async () => {
        const toastId = toast.loading(" Please wait...")
        setLoading(true);

        var options = {
            method: 'DELETE',
            url: process.env.NEXT_PUBLIC_URL + '/api/order/shipping/' + orderId,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
        };

        try {
            const response = await axios.request(options);
            setLoading(false);
            toast.update(toastId, { render: `${response.data.message} `, type: "success", isLoading: false, ...toastConfig });
            setIsOpen(false)
        } catch (error) {
            setLoading(false);
            toast.update(toastId, { render: error.response?.data.message || error.toString(), type: "error", isLoading: false, ...toastConfig });
        }

    }


    return (
        <GlobalModal
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
            small={true}
        >
            <div className={tabelclasses.modal_icon}>
                <Truck width={90} height={90} />
                <p>Are you sure, you want to Cancel Order?</p>
                <div>
                    <button
                        className={tabelclasses.danger_button}
                        disabled={loading}
                        onClick={() => cancelThisOrder()}
                    >
                        Yes
                    </button>
                    <button
                        className={tabelclasses.success_button}
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </GlobalModal>

    )
}
export default CancelOrderPopup