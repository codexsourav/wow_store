import { ExclamationCircleFill } from "@styled-icons/bootstrap";
import { useRouter } from "next/router";

function ErrorCheckout() {
    const router = useRouter();
    const { message, order_status } = router.query;
    return (
        <div className="container my-5" >
            <h1 className="mb-3" > <ExclamationCircleFill width={30} height={30} color="#f36b6d" /> Checkout Failed</h1>
            {message ? <p>{message}</p> : "Unable to proceed because the required element is unexpectedly detached from the page."}
            {order_status ? <p>Status : {order_status}</p> : null}

            <div className="mt-2">
                <a className="sub_button" href="/checkout" style={{ padding: 10, paddingLeft: 18, paddingRight: 18 }} >Checkout Again</a>
                <a href="mailto:info@mystore.com" className="ms-4" style={{ color: "#e5ba73" }}>Contact US</a>
            </div>
        </div>
    )
}
export default ErrorCheckout;