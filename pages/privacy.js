import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "~/styles/pages.module.css";

const PrivacyPage = ({ data, error }) => {
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Privacy Policy" />
          
          {/*
          <div className="layout_top">
            <h1 className={classes.heading}>Privacy Policy</h1>
            {data && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: data.page && data.page.content,
                }}
              ></div>
            )}
          </div>
          */}
          
          <main className="privacyPage">
          
    <section className="privacyPolicy">
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-xl-12 col-lg-8 col-md-8 col-sm-12">
    <h1><span>Privacy Policy</span></h1>
    <br/>
    <p className="normText">Our privacy policy is to make you aware of how we (World of Watch/WOW) use personal information collected through this website. Please read this privacy policy before using the site or submitting any personal information. By using the site, you accept the practices described in this privacy policy. These practices may be changed, but any changes will be posted and changes will only apply to activities and information going forward, not retroactive basis. You are encouraged to review the privacy policy whenever you visit the site to make sure that you understand how any personal information you provide will be used.</p>

       <p>Note: The privacy practices outlined in this privacy policy are for this website only. If you link to other websites, please review the privacy policies posted at those sites.</p>

       <h2 className="normHeading"><span>What information do we collect?</span></h2>
          <div className="termsCol">
          <p className="normText">
               We collect information from you when you register on our site, place an order or subscribe to our newsletter. When ordering or registering on our sit as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone number, and/or credit/debit card information.</p>      
 </div>

  <ul className="grid-list">

   
<li>
    <h2><span>Cookies</span></h2>
    <div className="termsCol">
    <p className="normText">The website may use cookie and tracking technology depending on the features offered. Cookie and tracking technology are useful for gathering information such as browser type and operating system, tracking the number of visitors to the Site, and understanding how visitors use the Site. Cookies can also help customize the site for visitors. Personal information cannot be collected via cookies and other tracking technology; however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties. By collecting data based on user demographics including age and gender, the website does not utilize such information to individually identify a visitor. The data gathered is only referred to for providing better offers based on group segmentation and improving the user experience and interface.</p>
    </div>
</li>


<li>
<h2><span>Distribution Of Information</span></h2>
<div className="termsCol">
              <p className="normText">Any personally identifiable information you submit to the site will ONLY be disclosed to service providers who are linked to your request. We will not disclose, sell, share, or in any way reveal your information to any other third party. However, we may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when: (1) permitted or required by law; or, (2) trying to protect against or prevent actual or potential fraud or unauthorized transactions; or, (3) investigating fraud that has already taken place.</p>

              <p className="normText"><strong>We will use your personal information to:</strong></p>
              <ul>
                <li> <p className="normText">Supply and manage the service we provide to you</p></li>
                <li> <p className="normText">Improve and develop the products we offer by analyzing your information so that we can learn</p></li>
              </ul>


            
            </div>
       
</li>

<li>
<h2><span>Commitment To Data Security</span></h2>
    <div className="termsCol">
         <p className="normText">Your personally identifiable information is kept secure. Only authorized employees, agents, and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.</p>

        <p className="normText">In certain cases, specifically with regard to particular products, you might be required to provide your credit or debit card details to the approved payment gateways while making the payment. In this regard, you agree to provide correct and accurate credit/ debit card details to the approved payment gateways for availing services on the website. You shall not use a credit/ debit card that is not lawfully owned by you, which means, in any transaction, you must use your own credit/ debit card. The information provided by you will not be utilized or shared with any third party unless required in relation to fraud verifications or by law, regulation, or court order. You will be solely responsible for the security and confidentiality of your credit/ debit card details. World of Watch/WOW expressly disclaims all liabilities that may arise as a consequence of any unauthorized use of your credit/ debit card.</p>
    </div>
</li>

<li>
<h2><span>Online Privacy Policy Only</span></h2>
<div className="termsCol">
      <p className="normText">This online privacy policy applies only to information collected through our website and not to information collected offline.</p>
</div>

</li>

<li>
<h2><span>Your Consent</span></h2>
<div className="termsCol">
    <p className="normText">By using our site, you consent to our website’s privacy policy.</p>
</div>

</li>

<li>
<h2><span>Changes to our Privacy Policy</span></h2>
  <div className="termsCol">
   <p className="normText">If any provision of these Terms and Conditions is deemed void, unlawful, or otherwise unenforceable for any reason, that provision shall be severed from this agreement, and the remaining provisions of this agreement shall remain in force.</p>
  </div>
</li>

<li>
<h2><span>Comments</span></h2>
  <div className="termsCol">
   <p className="normText"> We welcome any questions or comments about privacy. Please send an Email to: wow.gurgaon@outlook.com</p>
  </div>

</li>

<li>
<h2><span>Contact Information</span></h2>
  <div className="termsCol">
          <p className="normText">For any questions, concerns, or comments about our privacy policy, you may email us at wow.gurgaon@outlook.com or call us at +91-8448338684 (Mon-Sat, 11 am–8 pm) WOW reserves the right to modify and/ or change the terms of this policy without any prior notice.</p>
          </div>
</li>





<li>
<h2><span>Shipping Policy</span></h2>
  <div className="termsCol">
      <p className="normText">Once the order is confirmed, you will be receiving an email with the tracking link of your order. Alternatively, you can also call us at XXX or Email us at wow.gurgaon@outlook.com to track your orders.</p>
  </div>
    
</li>


<li>
<h2><span>Arrival Time</span></h2>
  <div className="termsCol">
      <p className="normText">From the period of dispatch, our typical delivery time is 5-7 working days. We only work with reputable courier companies to ensure that your items arrive on time and in perfect condition.</p>
  </div>
    
</li>


    </ul>

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

PrivacyPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {
      const { origin } = appUrl(context.req);
      const url = `${origin}/api/home/pages?scope=privacy`;
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

export default PrivacyPage;
