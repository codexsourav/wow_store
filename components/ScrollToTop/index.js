import { useEffect, useState } from "react";
import Classes from "./scrollToTop.module.css";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  let [activeWhatsApp, setActive]= useState('')

  function scrollCheck() {
    if (window.pageYOffset > 300) {
      setShowButton(true);
      setActive('activeWeb')
    } else {
      setShowButton(false);
         setActive('')
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollCheck);
    return () => {
      window.removeEventListener("scroll", scrollCheck);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    
     <a href="https://wa.me/918448338684?text=Hello%20Wow" target="_blank" className={`btn-whatsapp-pulse ${activeWhatsApp}`}>
     <i className={`fa fa-whatsapp`}></i>
   </a>
    
    
      {showButton && (
        <button onClick={scrollToTop} className={Classes.button}>
        <i class="fa fa-angle-up"></i>

        </button>
      )}
    </>
  );
};

export default ScrollToTop;
