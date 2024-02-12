
'use client';
import { useEffect } from 'react';

import Link from "next/link";
import Image from "next/image";
import Script from 'next/script'

export default function Header(props) {

  {/*

  if (!props.carousel) return null;
  
  useEffect(() => {
      
    const script = document.createElement('script');


    script.async = true;
    script.src = '/js/custom.js';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  */}

  return (
    <>

       <section className="banner">
        <div className="Watchbanner">
         
          <div className="img-bg container">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {props.carousel.carouselData.map((x) => {
                    return (
                      <div key={x.id} className="swiper-slide">
                        <div className="banner-content">
                          <div className="banner-titles">
                            <h4>{x.title}</h4>
                            <h3>{x.subTitle}</h3>
                            <p className='descript'>{x.description}</p>
                            <div className="viewallbtn pt-xl-2 pt-lg-3 md-xl-3 md-lg-1 md-sm-0">
                              <Link href={x.url} className="animated-border"><Image src="/images/group-34.svg" alt={x.title} width={40} height={37} />
                                <span>Explore All <b>Collections</b></span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <Image src={x.image[0].url} width={303} height={450} key={Math.random()} alt="Picture of the author" />
                      </div>

                    )
                  })
                }

              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}


