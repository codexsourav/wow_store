
import React from 'react'
import Script from 'next/script'

export default function ScriptComp() {
  return (
   <>
    <Script src="/js/owl.carousel.js" strategy="beforeInteractive" />
    <Script src='/js/swiper-bundle.min.js' strategy="beforeInteractive"  />
    <Script src='/js/zoom-Drift.min.js' strategy="beforeInteractive" />
    
   </>
  )
}
