import next from "next"
import Script from 'next/script'
export default function Head() {
  return (
<>
        {/*<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" /> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9487XPF"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
        <link href="/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="/css/owl.theme.default.min.css" rel="stylesheet" />   
        <Script src="/js/snap.svg-min.js" />
        <script src="/js/owl-jquery.min.js"></script> 
        <link href="/css/header.css" rel="stylesheet" /> 
        <link href="/css/main.css" rel="stylesheet" />
        <link href="/css/responsive.css" rel="stylesheet" />
        <link rel='stylesheet' href='https://unpkg.com/swiper/swiper-bundle.min.css' /> 
         <link href="/css/zoom-efect.css" rel="stylesheet" />
        
</>
  )
}
