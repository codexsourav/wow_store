import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "~/styles/pages.module.css";
import Link from 'next/link'

const TermsPage = ({ data, error }) => {
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Terms & Conditions" />
          
          {/*
          <div className="layout_top">
            <h1 className={classes.heading}>Terms & Conditions</h1>
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
          
          
      <main className="trmsPage">    
    <section className="termConditions">
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <h1><span>Terms and conditions</span></h1>

         <p className="normText">This use of World of Watches/WOW website and all the materials on this website are subject to the terms and conditions 
         (“TERMS AND CONDITIONS”) of this legal webpage. Please read these terms and conditions carefully before using the World of Watches/WOW website. By using this website, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of use contained on this legal webpage. These terms and conditions of use may be amended or changed by us at any time at our discretion. You agree that your continued use of this website after any such amendment or change shall constitute your agreement to any such changes.
</p><br/> 
<h2 className="normHeading"><span>Why Us</span></h2>
  <ul className="grid-list">

      <li>
      <h2><span>General</span></h2>
          <div className="termsCol">
     <p className="normText">This World of Watches/WOW website <a href="https://www.worldofwatchesindia.com/" target="_blank">"www.worldofwatchesindia.com"</a> is owned and operated by Sunil Kumar Gupta and it has the right at any time to change or discontinue any aspect or feature of this website including, without limitation, the content, hours of availability and equipment needed for access to or use of the website. World of Watches/WOW has no obligation to update this site in a specific timeframe and, therefore, any information may be out of date.</p>      
 </div>
   </li>
<li>
    <h2><span>Business</span></h2>
    <div className="termsCol">
   <p className="normText">Any business associates or Brands on this site are independent of World of Watches/WOW. Such business associates are not joint venture partners or any other kind of partners of World of Watches/WOW.</p>

    <p className="normText">The information and descriptions contained on this site are intended as general information and are not necessarily complete descriptions of all terms, exclusions, and conditions applicable to the products and Services offered by World of Watches/WOW.</p>
    </div>
</li>
<li>
<h2><span>Disclaimer Of Warranty & Limitation Of Liability</span></h2>
<div className="termsCol">
 <p className="normText">You expressly agree that you are using this site at your sole risk. Neither World of Watches/WOW nor any of its or their respective employees, agents, third-party content providers, licensors, or business partners warrant that this site will be uninterrupted or error-free; nor do they make any warranty as to the results that may obtain from the use of this site, or as to the accuracy or liability of any information, service or merchandise provided through this site.</p>

            <p className="normText">This site is provided on an as-is basis without warranties of any kind, either express or implied, including but not limited to warranties of title, or implied warranties of merchantability or fitness for a particular purpose, other than those warranties that are implied by and incapable of exclusion, restriction or modification under applicable law. Additionally, there are no warranties as to the results obtained from the use of this site.
            </p>

             <p className="normText">This disclaimer of liability applies to any damages or injury caused by any failure of performance, error, omission, inaccuracy, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction, or unauthorized access to, alteration of, or use of this site whether for breach of contract, tortious behavior (including strict liability), negligence or under any other cause of action. You specifically acknowledge that World of Watches/WOW is not liable for the defamatory or offensive or illegal conduct of other users or third parties and that the risk of injury from the foregoing rests entirely with you.</p>

            <p className="normText">In no event will World of Watches/WOW, or any person or entity involved in creating, producing, or distributing this site, or the content included herein, be liable in contract, in tort (including for its own negligence), or under any other legal theory (including strict liability) for any damages including, without limitation, direct, indirect, incidental, special, punitive, consequential or similar damages, including without limitation, lost profits or revenues, loss of use or similar economic loss, arising out of the use of inability to use the site. You hereby acknowledge that the provisions of this section shall apply to all use of and content on this site. Applicable law may not allow the limitation or exclusion of liability or incidental or consequential damages, so the above limitation or exclusion may not apply to you. In no event shall just in time total liability to you for all damages, losses, or causes of action, whether in contract tort including its own negligence or under any other legal theory including strict liability, exceed the amount paid by you, if any, for accessing this site.</p>
            
            </div>
       
</li>

<li>
<h2><span>Indemnification</span></h2>
<div className="termsCol">
 <p className="normText">Any notices required or permitted hereunder may be given by personal delivery in writing or by mail. Notices delivered personally shall be deemed given as of the date of actual receipt. Notices shall be addressed as follows:  World of Watches/WOW <br/>77 & 77A, GROUND FLOOR, MGF Metropolitan Mall, Mehrauli Gurugram Road, Gurugram, Gurugram, Haryana, 122002</p>
</div>
</li>

<li>
<h2><span>Intellectual Property Rights</span></h2>
<div className="termsCol">
      <p className="normText">Everything on this website, including without limitation, all text, graphics, software, logos, icons, and images, is the valuable intellectual property of World of Watches/WOW.</p>
</div>

</li>

<li>
<h2><span>Links</span></h2>
<div className="termsCol">
    <p className="normText">This site may contain links to other Internet sites (“Third Party Sites”) that are not maintained by World of Watches/WOW. These links are provided solely for your convenience, and you access them at your own risk. World of Watches/WOW makes no warranties or representations about the contents of products, services, or information offered in such third-party sites. Consequently, World of Watches/WOW is not and cannot be held responsible for the accuracy, copyright compliance, legality, or decency of material contained in sites linked to this World of Watches/WOW site.</p>
</div>

</li>

<li>
<h2><span>Severability</span></h2>
  <div className="termsCol">
    <p className="normText">If any provision of these Terms and Conditions is deemed void, unlawful, or otherwise unenforceable for any reason, that provision shall be severed from this agreement, and the remaining provisions of this agreement shall remain in force.</p>
  </div>
</li>

<li>
<h2><span>Termination</span></h2>
  <div className="termsCol">
    <p className="normText">World of Watches/WOW, in its sole discretion, can terminate or suspend your access to all or any part of this site including, but not limited to, any bulletin boards on this site, for any reason, including without limitation, breach of this agreement. If this agreement is terminated, the restrictions regarding materials appearing on this site and the representations and warranties, indemnities, and limitations of liability outlined in this agreement shall survive any such termination.</p>
  </div>

</li>

<li>
<h2><span>Governing Law</span></h2>
          <p className="normText">These Terms and Conditions are governed by the laws of India as such.</p>
</li>


<li>
<h2><span>Jurisdiction</span></h2>
  <div className="termsCol">
     <p className="normText">This website is controlled and operated by World of Watches/WOW from its registered office located in India. These Terms and Conditions shall be governed by and construed following the laws of the Republic of India. Any action related to matters on this website shall be brought to the appropriate courts of Delhi.</p>
  </div>
    
</li>


    </ul>

    <div className="btnBox">
<Link href="/return" className="normBtn">Cancel And Return Policy</Link>
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

TermsPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {
      const { origin } = appUrl(context.req);
      const url = `${origin}/api/home/pages?scope=terms`;
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

export default TermsPage;
