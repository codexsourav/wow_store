import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "../styles/pages.module.css";

const AboutPage = ({ data, error }) => {
  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="About Us" />
          
         
          {/*<div className="layout_top">
            <h1 className={classes.heading}>About Us</h1>
            {data && (
              <div
                className={classes.content}
                dangerouslySetInnerHTML={{
                  __html: data.page && data.page.content,
                }}
              ></div>
            )}
          </div>*/}
          
          
          
<main className="aboutPage">


{/*  

<section className="breadcrumbsec">
    <div className="container">
      <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
  </ol>
</nav>

    </div>
  </section> 
  
  */}
  
  
  
    <section className="aboutSec">
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-xl-12 col-lg-8 col-md-8 col-sm-12">
    <h1><span>About Us</span></h1>
    <br/>
    <p className="normText">Our story starts from a 400 SQFT store in the Central Market (Sadar Bazaar) with just 2 brands. The year was 1994 when only two brands ruled the roost (TITAN and HMT). With our focus on customer delight and providing them with a personalized shopping experience, we steadily grew from 1 store to the current 4 stores in Gurgaon alone. We are proud to be associated with over 30 national and international brands and strive to add more to our catalog.</p>

  <br/> <br/>

       <h2 className="normHeading"><span>Why Us</span></h2>
          <div className="termsCol">
     
 </div>

  <ul className="grid-list">

   
<li>
    <h2><img src="/images/servicing.webp" /> <span>Authentic</span></h2>
    <div className="termsCol">
    <p>The website may use cookie and tracking technology depending on the features offered. Cookie and tracking technology are useful for gathering information such as browser type and operating system, tracking the number of visitors to the Site, and understanding how visitors use the Site. Cookies can also help customize the site for visitors. Personal information cannot be collected via cookies and other tracking technology; however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties. By collecting data based on user demographics including age and gender, the website does not utilize such information to individually identify a visitor. The data gathered is only referred to for providing better offers based on group segmentation and improving the user experience and interface.</p>
    </div>
</li>


<li>
<h2><img src="/images/keeping-away-from-magnets.webp" /> <span>Superior Services</span></h2>
<div className="termsCol">
              <p>We believe in providing a personalized shopping experience for our esteemed customers. We are a part of your watch purchase journey understanding what exactly you want and delivering it within no time. Our dedicated after-sales service team ensures that we are always available to support you.</p>            
            </div>       
</li>

<li>
<h2><img src="/images/water-resistance-matters.webp" /> <span>Experienced Team</span></h2>
    <div className="termsCol">
         <p>Our highly knowledgeable and trained staff ensures that watch buying is a hassle-free experience. They ensure that you walk out not just with a watch but with a relationship built on trust and care for your purchase and you.</p>
    </div>
</li>

<li>
<h2><img src="/images/your-watch-crystal.webp" /> <span>Large Collection</span></h2>
<div className="termsCol">
      <p>Our huge collection offers customers a wide range of the best available options at any given time. From vintage to the latest, your choice is our command.</p>
</div>

</li>

<li>
<h2><img src="/images/the-watch-box.webp" /> <span>Warranted Products</span></h2>
<div className="termsCol">
    <p>We ensure to take every step to make your purchase last life-long. All the repair and is servicing done for all and any kind of time instruments including wall clocks, wrist watch, and table clocks within their warranty period or during extended ones.</p>
</div>

</li>

<li>
<h2><img src="/images/sun-exposure.webp" /> <span>Competitive Prices</span></h2>
  <div className="termsCol">
    <p>Our prices are competitive with that of retailers around the country. We offer authentic, original, and quality-assured products at reasonable pricing.</p>
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

AboutPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    try {
      const { origin } = appUrl(context.req);
      const url = `${origin}/api/home/pages?scope=about`;
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
  }
);

export default AboutPage;
