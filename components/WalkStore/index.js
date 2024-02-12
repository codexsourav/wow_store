import next from "next"
import Link from "next/link"
import Image from 'next/image'

export default function WalkStore() {
  return (
   <>
   <section className="walk-into-store">
<div className="container">
  <div className="row">
  <div className="col-xl-6 col-lg-6 col-sm-8 col-12">
        <div className="walkstrDtls">
          <h2>Walk Into Our Stores</h2>
          <p className="normText pb-3">At World Of Watches, our values are simple: Quality, Style, and Innovation. Explore our world and discover watches that redefine elegance.</p>
            <div className="walkStore-Addresss">
            
            
            <div class="accordion" id="wowStore">
            
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#worldWatches" aria-expanded="true" aria-controls="worldWatches">
                   World of watches Worldmark
                  </button>
                </h2>
                <div id="worldWatches" class="accordion-collapse collapse" data-bs-parent="#wowStore">
                  <div class="accordion-body">
                   <div className='storeAddress'>
                        Tower  <span className="numberopt">3</span>, Shop No  <span className="numberopt">117</span>, First Floor, WorldMark, Sector 65, Gurugram, Haryana <span className="numberopt">122001</span>
                   </div>
                      <div class="storeDetails">
                         <span data-bs-toggle="modal" data-bs-target="#world-of-watches-worldmark"><i class='fa fa-map-marker'></i>Location on Map</span>
                        {/*<Link href='https://worldofwatchesindia.com/worldmark' target='_blank'><i class='fa fa-arrow-circle-o-right'></i> View Shop</Link>*/}
                   </div>
                   <div className="storeCollMail">
                       <div className="storeColl"> <Link href='tel:+91844833868' className="numberopt">844833868</Link></div>
                       <div className="storeEmail"><Link href='mailto:wowwm.gur@outlook.com'>wowwm.gur@outlook.com</Link></div>
                   </div>
                
                  </div>
                </div>
              </div>
              
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#casioExcluve" aria-expanded="false" aria-controls="casioExcluve">
       Casio Exclusive Store, (Ambience Mall)
      </button>
    </h2>
    <div id="casioExcluve" class="accordion-collapse collapse" data-bs-parent="#wowStore">
        <div class="accordion-body">
           <div className='storeAddress'>
               F<span className="numberopt">109</span>, <span className="numberopt">1</span>st Floor, Ambience Mall, NH <span className="numberopt">8</span>, Ambience Island, DLF Phase <span className="numberopt">3</span>, Sector <span className="numberopt">24</span>, Gurugram, Haryana <span className="numberopt">122002</span>
           </div>
            <div class="storeDetails"><span data-bs-toggle="modal" data-bs-target="#casio-exclusive-store"><i class='fa fa-map-marker'></i>Location on Map</span></div>
       
           <div className="storeCollMail">
               <div className="storeColl"> <Link href='tel:+91844833868' className="numberopt">844833868 </Link></div>
               <div className="storeEmail"><Link href='mailto:wowwm.gur@outlook.com'>wowwm.gur@outlook.com</Link></div>
           </div>
           {/*<div class="storeDetails"><Link href='https://worldofwatchesindia.com/casio-exclusive-store' target='_blank'><i class='fa fa-arrow-circle-o-right'></i> View Shop</Link></div>*/}
           
            </div>
    
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mgf_Grd_Flr" aria-expanded="false" aria-controls="mgf_Grd_Flr">
  MGF Metropolitan Mall, (Ground Floor)
      </button>
    </h2>
    <div id="mgf_Grd_Flr" class="accordion-collapse collapse" data-bs-parent="#wowStore">
        <div class="accordion-body">
           <div className='storeAddress'>
               Shop no. <span className="numberopt">77 &77</span>A, Ground floor, MGF Metropolitan Mall, M.G. Road, Gurugram, Haryana <span className="numberopt">122002</span>
           </div>
             <div class="storeDetails"><span data-bs-toggle="modal" data-bs-target="#mgf-metropolitan-mall-grfloar"><i class='fa fa-map-marker'></i>Location on Map</span></div>
           <div className="storeCollMail">
               <div className="storeColl"> <Link href='tel:+91844833868' className="numberopt">844833868 </Link></div>
               <div className="storeEmail"><Link href='mailto:wowwm.gur@outlook.com'>wowwm.gur@outlook.com</Link></div>
           </div>
           {/*<div class="storeDetails"><Link href='https://worldofwatchesindia.com/mgf-ground-floor' target='_blank'><i class='fa fa-arrow-circle-o-right'></i> View Shop</Link></div>*/}
          
        </div>
    </div>
  </div>
    <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mgf_Mtr_Flr" aria-expanded="false" aria-controls="mgf_Mtr_Flr">
      MGF Metropolitan Mall (First Floor)
      </button>
    </h2>
    <div id="mgf_Mtr_Flr" class="accordion-collapse collapse" data-bs-parent="#wowStore">
        <div class="accordion-body">
           <div className='storeAddress'>
               Shop  <span className="numberopt">41</span>, First floor, MGF Metropolitan Mall, M.G. Road, Gurugram,  Haryana <span className="numberopt">122002</span>
           </div>
            <div class="storeDetails"><span data-bs-toggle="modal" data-bs-target="#mgf-metropolitan-mall-fstfloar"><i class='fa fa-map-marker'></i>Location on Map</span></div>
           <div className="storeCollMail">
               <div className="storeColl"> <Link href='tel:+91844833868' className="numberopt">844833868 </Link></div>
               <div className="storeEmail"><Link href='mailto:wowwm.gur@outlook.com'>wowwm.gur@outlook.com</Link></div>
           </div>
           {/*<div class="storeDetails"><Link href='https://worldofwatchesindia.com/mgf-first-floor' target='_blank'><i class='fa fa-arrow-circle-o-right'></i> View Shop</Link></div>*/}
  
        </div>
    </div>
  </div>
</div>
            
       
            
            
               
            </div>

     
          
        </div>
      </div>  
      <div className="col-xl-6 col-lg-6 col-sm-4 co-12">
      <div className="stroeSlider">
        <div className="owl-carousel walkstoreslider owl-theme">     
              <div className="store" data-bs-toggle="modal" data-bs-target="#world-of-watches-worldmark">
                <Image src="/images/1.webp" width={231} height={354} alt='wow' />
                <span className="map" data-bs-toggle="modal" data-bs-target="#world-of-watches-worldmark"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              </div>
              <div className="store" data-bs-toggle="modal" data-bs-target="#casio-exclusive-store">
                <Image src="/images/2.webp"  width={231} height={354} alt='wow' />
                <span className="map" data-bs-toggle="modal" data-bs-target="#casio-exclusive-store"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
              </div>
            </div>
            </div>
    </div>
  </div>
  </div>
</section>
      </>
  )
}
