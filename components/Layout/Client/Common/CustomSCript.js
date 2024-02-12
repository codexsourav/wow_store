'use client'
import { useEffect } from 'react';
import next from "next"


export default function Script() {

    useEffect(() => {
        const script = document.createElement('script');
    
        script.src = '../js/custom.js';
        script.async = true;
    
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script);
        };
    }, []);
  return (

    
<>


      

</>
  )
}
