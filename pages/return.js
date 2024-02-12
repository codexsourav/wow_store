import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "~/styles/pages.module.css";

const ReturnPage = ({ data, error }) => {
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Return Policy" />
         <main className="cancellationPage">    
    <section className="cancellation">
    <div className="container">
   {/* <div class="row flex-row-reverse">
        <div class="col-xl-12 col-lg-8 col-md-8 col-sm-12" 
        dangerouslySetInnerHTML={{
                  __html: data.page && data.page.content,
                }}></div>
                </div> */}
    
    <div class="row flex-row-reverse">
        <div class="col-xl-12 col-lg-8 col-md-8 col-sm-12">
    <h1><span>Cancel AND Return (Direct Online Purchases)</span></h1>
   

  <ul class="grid-list">

      <li>
      <h2><span>Exchange And Cancellation Policy</span></h2>
          <div class="termsCol">
            <ol>

              <li><p>To initiate cancellation of a product purchased directly from www the customer must rely on the order confirmation Email received from wow.gurgaon@outlook.com or contact our helpline number at +91-8448338684, Mon-Sat, 11 am – 8 pm, IST</p></li>

               <li><p>An order can only be canceled or exchanged before it is shipped by World Of Watches/WOW. In case of an exchange, any extra difference to be paid will be borne by the customer.</p></li>


                <li><p>If a cancellation request is initiated after the product has been shipped by us, then the customer will have to follow the process as mentioned under the exchange and refund policy, where all the terms and conditions specified therein will be applicable.</p></li>


                 <li><p>The returned merchandise must be in its original condition and accompanied by the packing slip included in your order, the original warranty, as well as the original documentation and packaging; otherwise the return will not be honored.</p></li>


                 <li><p><strong>Damaged Box or Damaged Product:</strong> If you receive damaged or incorrect item(s), contact a Customer Loyalty Specialist no later than 5 business days of receipt of your shipment to make the necessary corrections. If there is extensive damage to the box, refuse delivery and contact our customer care.</p></li>


                 <li><p><strong>Refusal of Delivery:</strong> If a package is refused for delivery, due to arriving damaged or in a damaged box, the customer will be responsible for actual shipping charges incurred by World Of Watches/WOW. Once we receive the package back in our warehouse, we will issue a credit to the original form of payment for the purchase price less the actual shipping cost of shipping the package to you.</p></li>


                 <li><p><strong>Incorrect Shipping Address Provided:</strong> Packages that are returned because of an incorrect address provided by the customer will be subject to an additional shipping charge. This shipping charge will apply even if you were not originally charged shipping under a free shipping promotion. Requests for packages to be reshipped will be subject to a reshipping fee. If the package is returned and the customer has not contacted a Customer Loyalty Specialist the order will then be refunded back to the original form of payment.</p>
                 </li>


            </ol>    
 </div>
   </li>


<li>


<h2><span>Exchange And Refund Policy</span></h2>
<br></br>
<div class="termsCol">
 <p>This exchange and refund policy is applicable only for purchases made directly from www. Any exchange or refund has to be initiated and processed as per the policy given below and cannot be made at any of the other World Of Watches/WOW points of sale.</p>

<ol>
 <li><p>An exchange for a product purchased on www .in must be initiated by the customer within 7 days* of receiving the product. For example, if a customer has received the product on 7th March, at any given time of the day, then the exchange request must be initiated before midnight of 14th March to be accepted by World Of Watches/WOW.</p></li>

 <li><p>To initiate an exchange, please contact Customer Care at mail us at wow.gurgaon@outlook.com or call us at +91-8448338684, Mon-Sat, 11 am – 8 pm, IST. Once Customer Care has been informed of the intended exchange, the product must be couriered back in the original packaging as was received by the customer, to 77 & 77A, GROUND FLOOR, MGF Metropolitan Mall, Mehrauli Gurugram Road, Gurugram, Gurugram, Haryana, 122002.</p></li>


 <li><p>After the Customer Care team confirms the pick-up, a date will be decided with the customer’s consent, to schedule the pickup. The courier team will make two pick-up attempts only. On failing to handover, over the package within these two attempts, the customer will have to personally get the return package delivered at our courier partner’s office.</p></li>


 <li><p>A pick-up can only be arranged within city limits. Customers residing outside city limits will have to personally get the return package delivered at our courier partner’s office.</p></li>



 <li><p>The customer must ensure that the return package is placed inside tamper-proof packaging and addressed correctly.</p></li>


 <li><p>As specified above, all returns must be shipped via the courier service provided by World Of Watches/WOW through the designated courier partner. In this case, the freight charges will be borne by World Of Watches/WOW.</p></li>


 <li><p>In a case where a customer does not inform World Of Watches/WOW about the intended exchange and ships the return via a different courier company, the liability for any loss or damage to the product lies with the customer. In such a case, no exchange will be processed for the product by World Of Watches/WOW.</p></li>


 <li><p>The returned product must be in its original condition*. It must be accompanied by proof of purchase and the original warranty card, along with the original packaging of the product including manuals, hang tags, etc. In the absence of any one of these elements, the return will not be honored by World Of Watches/WOW.</p>

<p>*Original condition means that the watch must be in its authentic form as was received by the customer from World Of Watches/WOW, without any scratches, marks, or dents on the product. The security tags should be in place as they were at the time of delivery of the product. If the watch has been re-sized, that is, if the bracelet or strap of the watch has been adjusted or altered in any manner to fit the customer’s wrist, then World Of Watches/WOW will not be liable to honor any exchange for the product.</p>
</li>

<li><p>Once the product is returned to World Of Watches/WOW, our designated service center will inspect the watch for any abnormalities. This process usually takes up to 2 business days. The exchange for the product will be initiated by World Of Watches/WOW upon receiving a confirmation from the service center regarding the quality of the watch received.</p></li>

<li><p>Any exchange will take a minimum of 7 business days* from the date that the returned product is inspected and passed by the quality control team at the service center.</p></li>

<li><p>Any returned product that does not adhere to the quality guidelines administered by the World Of Watches/WOW service center will not be eligible for an exchange and will be sent back to the customer in the same condition as it was received by World Of Watches/WOW, on a To Pay basis.</p></li>

<li><p>In case of a refund, the amount would reflect in 5-6 working days.</p></li>

<li>Products purchased during sales and/or special promotions are not eligible for exchange or refund unless explicitly specified by World Of Watches/WOW.</li>

<li><p>Loyalty points used by a customer to purchase any product that is later exchanged or returned will not be refunded to the customer’s loyalty account or via any other medium.</p></li>

<li><p>In case of any dispute, World Of Watches/WOW will only be liable to refund the entire payment received from the customer for the specific purchase, upon receiving the returned product in the original condition*, and not be liable for compensation in any other form.</p></li>

<li><p>For any queries related to the exchange or refund of a product purchased on www.in, please drop us a mail at wow.gurgaon@outlook.com or contact our helpline at +91-8448338684, Mon-Sat, 11 am – 8 pm, IST World Of Watches/WOW reserves the right to modify and/ or change the terms of this policy without any prior notice.</p></li>

</ol>
</div>

</li>



    </ul>

    <div class="btnBox">
<a href="/terms" class="normBtn">Terms and Conditions</a>

</div>
</div>
</div>
            </div>
            </section>
          </main>
        </>
  )}
</>
);
};
ReturnPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {
      const { origin } = appUrl(context.req);
      const url = `${origin}/api/home/pages?scope=return`;
      const data = await fetchData(url);
      setSettingsData(store, data);
      return {
        data,
        error: false,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        error,
      };
    }
  },
);

export default ReturnPage;
