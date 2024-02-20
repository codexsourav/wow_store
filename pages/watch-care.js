'use client'

import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import {useEffect} from 'react'
import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import { wrapper } from "~/redux/store";
import classes from "../styles/pages.module.css";
import c from "./watchcare.module.css";

const AboutPage = ({ data, error }) => {
       let watchCareList=[
            {title : 'Battery Replacement', desc : 'Genuine Japanese and Swiss from trusted brands like Seizaiken and Renata', price:500, im:'watch-care-1.png'},
            {title : 'Strap Replacement', desc : 'Leather, Stainless steel or Synthetic from official brands or third party manufacturers', price:500, im:'watch-care-2.png'},
            {title : 'Glass Replacement', desc : 'Plastic glass, Mineral Crystal, Hardlex Crystal, Sapphire Crystal',price:500,im:'watch-care-3.png'},
            {title : 'Servicing of movement', desc : 'Complete overhauling of watch machine with cleaning and oiling of each individual component',price:500, im:'watch-care-4.png'},
            {title : 'Polishing & Buffing', desc : 'Scratch removal from case and watch bracelet and bring back the original shine', price:500, im:'watch-care-5.png'},
            {title : 'Crown Replacement', desc : 'Genuine Crown/key replacement with stem',price:500, im:'watch-care-6.png'},
            
            ]
    

  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData title="wacth Care" />
          
         
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
          
          
 <main className="wacthCarePage">
 
 <section className={c.TexTopBanner}>
<img src='/images/watch-care-banner.png' />
 </section>
 
 <section className="watchCareInfo  pt-5">
    <h2 className="text-center">Our Watch Care</h2>
    <div className="container">
    <div className="row d-flex justify-content-center">
    <div className="col-lg-8">
    <p className={`normText  py-3 ${c.justifyContent}`}>We know that you enjoy taking care of your watches just as much as you relish wearing them. 
      World of Watches takes pride in sharing this passion for caring for your watches
      Our experts are enthused to cater to any repair or replacement you require, whether it be replacing a strap or rare parts.
      We are always happy to help!
      Just get in touch with us and we will be enthused to help you throughout the journey you share with your watch.</p>
      </div>
      </div>
      </div>
</section>

		  	<section className={c.aboutgallery}>
		  	<div className='container'>
		  			<ul className={`mt-4 ${c.gridGallery}`}>
		  			{
		  			    watchCareList.map((x, i)=>{
		  			        
		  			        return(
		  			        <>
		  			        <li>
        		  					<img src={`/images/${x.im}`} />
        		  					<div className={c.captionText}>
        		  							<h2>{x.title}</h2>
        		  							<p className={c.tag}>{x.desc}</p>
        		  						{/*	<div className={c.startingFrom}>Starting From</div>
        		  							<div className={c.price}>{x.price}</div>*/}
        		  							
        		  						{/*	<div className={c.enq}>Enquire Now</div>*/}
        		  					</div>
		  				    </li>
		  			        </>
		  			        
		  			        )
		  			        
		  			    })
		  			}
		  				
		  				
		  				
		  			</ul>
		  			</div>
		  	</section>

  <section className="watchCare">
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-xl-12 col-lg-8 col-md-8 col-sm-12">
    {/*<h1><span>Watch Care Guidelines</span></h1>*/}
    <ul className="grid-list">
      <li>
      <h2><img src="/images/cleaning.webp" /> <span>Cleaning</span></h2>
      <p>Clean your watch as often as possible using a soft cloth. Wipe the band and the case to remove any dirt or dust.</p>
      </li>
<li>
    <h2><img src="/images/servicing.webp" /> <span>Servicing</span></h2>
    <p>Get your watch serviced every two or three years for a mechanical watch and three to four years for a quartz watch.</p>
</li>
<li>
<h2><img src="/images/keeping-away-from-magnets.webp" /> <span>Keeping Away from Magnets</span></h2>
<p>Placing your watch close to a magnet can negatively affect the timekeeping of your watch.</p>
</li>

<li>
<h2><img src="/images/water-resistance-matters.webp" /> <span>Water Resistance Matters</span></h2>
<p>Know your watch’s water resistance. Most watch these days are built with some water resistance, but with time, they tend to lose that resistance. If your watch is not water resistant, it can still handle small splashes of water, but it’s best to avoid it. If your watch has a leather band, avoid getting your watch wet as water weakens the leather.</p>
</li>

<li>
<h2><img src="/images/your-watch-crystal.webp" /> <span>Your Watch’s Crystal</span></h2>
<p>Take every precaution you can to prevent from banging the crystal of your watch against a wall or any other objects that may cause scratches.</p>
</li>

<li>
<h2><img src="/images/the-watch-box.webp" /> <span>The Watch Box</span></h2>
<p>Keep your watch box for storage as it is meant to keep the watch safe and offer protection. When not wearing your watch, it’s best to keep it in the box it came in.</p>
</li>

<li>
<h2><img src="/images/sun-exposure.webp" /> <span>Sun Exposure</span></h2>
<p>Avoid extended exposure to sunlight as it can fade the color of your watch and the heat can shorten the battery life.</p>
</li>

<li>
<h2><img src="/images/stay-away-from-chemicals.webp" /> <span>Stay Away from Chemicals</span></h2>
<p>Avoid contact with chemicals, such as cleaning supplies. Also, it’s best to avoid contact between your watch and perfume.</p>
</li>

<li>
<h2><img src="/images/let-professionals-handle.webp" /> <span>Let Professionals Handle</span></h2>
<p>Never open your watch by yourself. Leave this to a professional.</p>
</li>


<li>
<h2><img src="/images/understand-your-watch.webp" /> <span>Understand Your Watch</span></h2>
<p>Read your watch manual to take proper care of your watch.</p>
</li>

<li>
<h2><img src="/images/repair-center.webp" /> Repair Center</h2>
<p>All our physical stores work as state-of-the-art on-site repair/watch repair centers. They are staffed by professional watch smiths, horologists, and technicians. We provide speedy, on-site service for any watch covered under the terms of our warranty, from a simple battery replacement to a full repair to replace a defective mechanism.
Making customers happy with their purchases is what World of Watch/WOW aims at. Our professional team is always available to ensure that your watch-buying experience is satisfying. As with all of our merchandise, we offer a hassle-free, 30-day money-back return policy.</p>
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
