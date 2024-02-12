import { useEffect, useState } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import data from "~/data.json";
import useWindowDimensions from "~/lib/useWindowDimensions";
import HeadCommon from "~/components/Layout/Client/Common/HeadCommon";
import Footer from "~/components/Layout/Client/Common/FooterCommon";
import ScriptCommon from "~/components/Layout/Client/Common/ScriptCommon";
import { useRouter } from "next/router";

import HeaderCommon from "~/components/Layout/Client/Common/HeaderCommon.js";

const ClientLayout = (props) => {
  const footerVisibility =
    typeof props.footer == "undefined" ? true : props.footer;
  const [mobileNav, setMobileNav] = useState(false);
  const dimension = useWindowDimensions();
  useEffect(() => {
    if (dimension.width !== 0 && dimension.width <= 991) {
      return setMobileNav(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const router = useRouter();
    if(router.pathname == "/casio-exclusive-store" || router.pathname == "/worldmark" || router.pathname == "/mgf-ground-floor" || router.pathname == "/mgf-first-floor"){
  return (
    <>
      <main>{props.children}</main>
     
    </>
  );

   }else{
   return (
    <>
    
<HeadCommon />

 {/*mobileNav ? <MobileNav /> : <NavBar />*/}
              
<HeaderCommon />


      <main>{props.children}</main>
      
      
      <Footer footer={data.footer} visibility={footerVisibility} />
      
    
      <ScrollToTop />
      {/*mobileNav && <FooterMobile />*/}
      
  
      <ScriptCommon />
       {/*  <CustomSCript />
     */}

    </>
  );
   }
};

export default ClientLayout;
