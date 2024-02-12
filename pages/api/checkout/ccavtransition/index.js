import tmpPrepaidOrder from '~/models/tmpPrepaidOrder';
import ccav from './ccavutil';
import order from '~/models/order';
import notificationModel from "~/models/notification";
import userModel from "~/models/user";
import decrementProductQty from '~/lib/decrementProductQty';
const axios = require('axios');
var crypto = require('crypto');

export default async function apiHandler(req, res) {

  const status = req.body.accessCode;
  var ccavResponse = '', workingKey = '04DF3941276D4BBBFEA75FD8072C6B2D';

  // Generate Md5 hash for the key and then convert in base64 string
  var md5 = crypto.createHash('md5').update(workingKey).digest();
  var keyBase64 = Buffer.from(md5).toString('base64');
  // Initializing Vector and then convert in base64 string
  var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

  // Make Form para.. Data Json Data
  function queryStringToJson(queryString) {
    const params = new URLSearchParams(queryString);
    const json = {};
    params.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  }

  const errorPage = "/checkout/error"

  // check status code 
  if (status !== 'AVQB03KH69CH16BQHC') {
    return res.redirect(303, `${errorPage}?message=Unauthorized Payment Request! Please Try Again`);
  }

  // get PaymentRequest Data And Decrypt The Data  convert To JSon Object
  var encryption = req.body.encResp;
  ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
  const ccavResponseJson = queryStringToJson(ccavResponse);

  // Init Url Data Here 
  const paymentUriData = `&tracking_id=${ccavResponseJson.tracking_id}&order_status=${ccavResponseJson.order_status}&failure_message=${ccavResponseJson.failure_message}&order_id=${ccavResponseJson.order_id}&payment_mode=${ccavResponseJson.payment_mode}`

  try {
    var orderData;

    // delete Old Order to clean Tmp Database
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    await tmpPrepaidOrder.deleteMany({ orderDate: { $lt: oneDayAgo } });

    // check is order id exist or not 
    if (!ccavResponseJson.order_id || ccavResponseJson.order_id == "") {
      return res.redirect(303, `${errorPage}?message=Order ID Not Found${paymentUriData}`);
    }

    // check ts this order is exist on on Tmp Database 
    orderData = await tmpPrepaidOrder.findOneAndDelete({ "orderId": ccavResponseJson.order_id });
    if (!orderData) {
      return res.redirect(303, `${errorPage}?message=Order Not Found${paymentUriData}`);
    }

    // check Payment Gateway order status
    if (ccavResponseJson.order_status == "Failure") {
      return res.redirect(303, `${errorPage}?message=Oops! Something went wrong. Please check your details and try again${paymentUriData}`);
    }


    // revalidate order =================

    const merchantJsonData = {
      'order_no': ccavResponseJson.order_id,
      'reference_no': ccavResponseJson.tracking_id,
    };

    const merchantData = JSON.stringify(merchantJsonData);
    const encryptedData = ccav.encrypt(merchantData, keyBase64, ivBase64);

    const finalData = `enc_request=${encryptedData}&access_code=${status}&command=orderStatusTracker&request_type=JSON&response_type=JSON`;

    axios.post('https://apitest.ccavenue.com/apis/servlet/DoWebTrans', finalData)
      .then(response => {
        let status = '';
        const information = response.data.split('&');
        for (let i = 0; i < information.length; i++) {
          const infoValue = information[i].split('=');
          if (infoValue[0] === 'enc_response') {
            status = ccav.decrypt(infoValue[1], keyBase64, ivBase64).trim();
          }
        }
        const obj = JSON.parse(status);
        if (!obj.Order_Status_Result || obj.Order_Status_Result.order_no != ccavResponseJson.order_id || obj.Order_Status_Result.reference_no != ccavResponseJson.tracking_id || obj.Order_Status_Result.status != 0) {
          return res.redirect(303, `${errorPage}?message=Oops! Your Payment Not Verified. Please check your details and try again${paymentUriData}`);
        }
      })
      .catch(error => {
        console.log(error);
        return res.redirect(303, `${errorPage}?message=Oops! Your Payment Not Verified. Please check your details and try again${paymentUriData}`);
      });

    if (ccavResponseJson.order_status == "Success") {
      orderData = { ...orderData._doc, "status": "Pending", "paymentStatus": "Paid" }
      const newOrder = new order(orderData);
      await newOrder.save();

      await decrementProductQty(orderData.products);

      // add Order On User
      const message = `<p>A new order (<a href="/dashboard/orders/${orderData._id}" target="_blank">${orderData.orderId}</a>) has been placed</p>`;
      await notificationModel.create({ message });

      // add Order On User
      if (ccavResponseJson.merchant_param4 == "User" && ccavResponseJson.merchant_param3 != "") {
        await userModel.findByIdAndUpdate(ccavResponseJson.merchant_param3, {
          $push: { orders: orderData._id },
        });
      }

      // ON All IS Done Redirect HERE 

      return res.redirect(303, `/checkout/success/${orderData._id}?payment=success${paymentUriData}`);
    }

    return res.redirect(303, `${errorPage}?message=Unknown Error Please Contact Customer Support${paymentUriData}`);

  } catch (error) {
    console.log(error);
    return res.redirect(303, `${errorPage}?message=${error.toString()}${paymentUriData}`);
  }
}




