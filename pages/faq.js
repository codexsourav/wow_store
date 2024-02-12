import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "../styles/pages.module.css";

const FaqPage = ({ data, error }) => {
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="Faq" />
          
          
          <main className="faqPage">
          
           <section className="faqSec">
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-xl-12 col-lg-8 col-md-8 col-sm-12">
    <h1><span>FAQs</span></h1>
   <div className="accordion" id="accordionExample">
  <div className="accordion-item">
      <a className="accordion-button" data-bs-toggle="collapse" href="#faq1" aria-controls="faq1">
        Q. Does World of Watch have a traditional retail storefront?
      </a>
    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="normText">
         Yes. Apart from our website, you can find our stores at 4 locations in Gurgaon, Haryana, India.
         </p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq2" aria-controls="faq2">
        Q. Will the strap or bracelet fit my wrist?
      </a>

    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="normText">
       Strap and bracelet sizes can vary. Most watches we post are sized for the average wrist size. When possible, we try to include any additional links that have been provided by the seller and will add notes to the listing if the watch has short links. If you are unsure if a watch will fit your wrist, please contact your Client Advisor for sizing information. Additional links or a new strap may be purchased if available.</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq3" aria-controls="faq3">
       Q. Once I purchase a watch online, how long does it take you to ship it?
      </a>
    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="normText">
        Generally, our watches are shipped within 2 to 3 business days. You will receive a mail with the tracking number to track the dispatched watch. For more details, you can visit our shipping page.
        </p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq4" aria-controls="faq4">
       Q. I am not happy with the watch I purchased. How long do I have to return the watch to you?
      </a>
    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="normText">
        Our return period is within seven (7) days from the delivery date. This grace period applies to watches purchased directly from www. Watches must be returned unworn in the same condition in which they were sent to you. Check our return policy for more details.
        </p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq5" aria-controls="faq5">
       Q. What types of payments do you accept?
      </a>
    <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
     <p className="normText">    We accept ……………….</p>
      </div>
    </div>
  </div>
   <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq6" aria-controls="faq6">
       Q. Do you offer financing/ EMI?
      </a>
    <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <p className="normText"> Please let me know the answer to put</p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
      <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#faq7" aria-controls="faq7">
       Q. What happens if my watch has an issue? What is your Warranty?
      </a>
    <div id="faq7" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       <p className="normText"> Every brand has its own warranty period that comes in the warranty card attached to it. Please feel free to check out the warranty page to know more details and the procedure to follow in case of an issue.</p>
      </div>
    </div>
  </div>
</div>

  


</div>

</div>

</div>

  </section>
          </main>
          
          {/*
          <div className="layout_top">
            <h1 className={classes.heading}>FAQ</h1>
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
          
          
        </>
      )}
    </>
  );
};

FaqPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {
      const { origin } = appUrl(context.req);
      const url = `${origin}/api/home/pages?scope=faq`;
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

export default FaqPage;
