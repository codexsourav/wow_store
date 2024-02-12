import order from '~/models/order';
import product from '~/models/product';

import data from "~/data.json";

// Function to get country data by name data.json
function getCountryDataByName(countryName) {
    const lowerCaseName = countryName.toLowerCase();
    const country = data.country.find((c) => c.name.toLowerCase() === lowerCaseName);
    return country || null;
}


// create SippingOrder Data 
const createShippingOrderData = async (orderData, measurement) => {
    try {


        // this loop get products data and Structured data
        const getOrderProductsData = async () => {
            var orderProducts = [];
            for (let i = 0; i < orderData.products.length; i++) {
                const id = orderData.products[i]._id;
                const ProductsData = await product.findById(id);

                if (!ProductsData)
                    throw Error(`Product ${orderData.products[i].name} Not Found`);

                orderProducts.push({
                    "name": ProductsData.name,
                    "sku": ProductsData.sku,
                    "units": orderData.products[i].qty,
                    "selling_price": orderData.products[i].price,
                    "discount": (ProductsData.price - orderData.products[i].price),
                    // "tax": "",
                    "hsn": "9101"
                });
            }
            return orderProducts;
        }



        const billIngAddress = orderData.billingInfo;
        const shippIngAddress = orderData.shippingInfo;

        return {
            "order_id": orderData.orderId,
            "order_date": orderData.orderDate,
            // "pickup_location": "",
            "channel_id": "",
            // "comment": "",
            // "reseller_name": "",
            "company_name": "Wow Watches",
            "billing_customer_name": billIngAddress.fullName,
            "billing_last_name": "",
            "billing_address": billIngAddress.house,
            // "billing_address_2": "",
            "billing_isd_code": getCountryDataByName(billIngAddress.country).isd,
            "billing_city": billIngAddress.city,
            "billing_pincode": billIngAddress.zipCode,
            "billing_state": billIngAddress.state,
            "billing_country": billIngAddress.country,
            "billing_email": billIngAddress.email,
            "billing_phone": billIngAddress.phone,
            // "billing_alternate_phone": "",
            "shipping_is_billing": false,
            "shipping_customer_name": shippIngAddress.fullName,
            // "shipping_last_name": "",
            "shipping_address": shippIngAddress.house,
            // "shipping_address_2": "",
            "shipping_city": shippIngAddress.city,
            "shipping_pincode": shippIngAddress.zipCode,
            "shipping_country": shippIngAddress.country,
            "shipping_state": shippIngAddress.state,
            "shipping_email": shippIngAddress.email,
            "shipping_phone": shippIngAddress.phone,
            "order_items": await getOrderProductsData(),
            "payment_method": orderData.paymentMethod == "Cash On Delivery" ? "COD" : "Prepaid",
            "shipping_charges": orderData.deliveryInfo.cost,
            // "giftwrap_charges": "",
            // "transaction_charges": "",
            // "total_discount": "",
            "sub_total": orderData.payAmount,
            // "length": "",
            // "breadth": "",
            // "height": "",
            // "weight": "",
            ...measurement
            // "order_type": "",
            // "ewaybill_no": "",
            // "invoice_number": "",
            // "customer_gstin": "",
        };
    } catch (error) {
        throw error;
    }
}

export default createShippingOrderData;