import tmpPrepaidOrder from '~/models/tmpPrepaidOrder';
import order from '~/models/order';
import notificationModel from "~/models/notification";
import userModel from "~/models/user";
import decrementProductQty from '~/lib/decrementProductQty';
const axios = require('axios');

var jsSHA = require('jssha');
var crypto = require('crypto');
//const {default: axios} = require('axios');

//var urlencodedParser = bodyParser.urlencoded({extended: false});
//const OrderConfirmed = require('../models/OrderConfirmed');

//To verify the payment and save in your database
export default async function apiHandler(req, res) {
        
  if (req.body.status == 'success') {
    const {
      country,
      mode,
      error_Message,
      state,
      bankcode,
      txnid,
      net_amount_debit,
      lastname,
      zipcode,
      phone,
      productinfo,
      hash,
      status,
      firstname,
      city,
      isConsentPayment,
      error,
      addedon,
      encryptedPaymentId,
      bank_ref_num,
      key,
      email,
      amount,
      unmappedstatus,
      address2,
      payuMoneyId,
      address1,
      mihpayid,
      giftCardIssued,
      field1,
      cardnum,
      field7,
      field6,
      field9,
      field8,
      amount_split,
      field3,
      field2,
      field5,
      PG_TYPE,
      field4,
      name_on_card,
    } = req.body;
    
    
    try {
        var orderData;

    // delete Old Order to clean Tmp Database
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    await tmpPrepaidOrder.deleteMany({ orderDate: { $lt: oneDayAgo } });
    
    // check is order id exist or not 
    if (!txnid || txnid == "") {
      return res.redirect(303, `${errorPage}?message=Order ID Not Found`);
    }
    
    // check ts this order is exist on on Tmp Database 
    orderData = await tmpPrepaidOrder.findOneAndDelete({ "orderId": txnid });
    if (!orderData) {
      return res.redirect(303, `${errorPage}?message=Order Not Found`);
    }

    orderData = { ...orderData._doc, "status": "Pending", "paymentMethod": "PayU","paymentStatus": "Paid" }
      const newOrder = new order(orderData);
      await newOrder.save();

      await decrementProductQty(orderData.products);
          
          // add Order On User
      const message = `<p>A new order (<a href="/dashboard/orders/${orderData._id}" target="_blank">${orderData.orderId}</a>) has been placed</p>`;
      await notificationModel.create({ message });
    //   const newOrder = new order({
    //     country: country,
    //     mode: mode,
    //     error_Message: error_Message,
    //     state: state,
    //     bankcode: bankcode,
    //     txnid: txnid,
    //     net_amount_debit: net_amount_debit,
    //     lastname: lastname,
    //     zipcode: zipcode,
    //     phone: phone,
    //     productinfo: productinfo,
    //     hash: hash,
    //     status: status,
    //     firstname: firstname,
    //     city: city,
    //     isConsentPayment: isConsentPayment,
    //     error: error,
    //     addedon: addedon,
    //     encryptedPaymentId: encryptedPaymentId,
    //     bank_ref_num: bank_ref_num,
    //     key: key,
    //     email: email,
    //     amount: amount,
    //     unmappedstatus: unmappedstatus,
    //     address2: address2,
    //     payuMoneyId: payuMoneyId,
    //     address1: address1,
    //     mihpayid: mihpayid,
    //     giftCardIssued: giftCardIssued,
    //     field1: field1,
    //     cardnum: cardnum,
    //     field7: field7,
    //     field6: field6,
    //     field9: field9,
    //     field8: field8,
    //     amount_split: amount_split,
    //     field3: field3,
    //     field2: field2,
    //     field5: field5,
    //     PG_TYPE: PG_TYPE,
    //     field4: field4,
    //     name_on_card: name_on_card,
    //   });

      //await newOrder.save();
      
    //   res.send({
    //     status: req.body.status,
    //     transaction_id: `Your transaction id is: ${req.body.mihpayid}. Kindly save it for any further query related to your placed order.`,
    //     message:
    //       "Congratulations! You'll shortly receive an acknowledgment email from us regarding your placed order. Thank your for buying, We are glad to serve you! ",
    //   });

     const paymentUriDatas = `&tracking_id=${req.body.mihpayid}&order_status=${req.body.status}&order_id=${orderData._id}`
      return res.redirect(303, `/checkout/success/${orderData._id}?payment=success${paymentUriDatas}`);
    } catch (err) {
      res.status(500).send('MongoDB could not save the data');
    }
  } else {
  
    //res.send({status: 'Payment is not Successful'});
    const errorPage = "/checkout/error"
     return res.redirect(303, `${errorPage}?message=Payment is not initiated. Please try again.`);
  }
}
