import Head from "next/head";
import Script from "next/script";
import { memo } from "react";
import { useSelector } from "react-redux";

const HeadData = ({ title, seo, url }) => {
  const settings = useSelector((state) => state.settings);
  const siteName = settings.settingsData.name;
  const titleData = `${siteName} ${
    title
      ? "| " + title
      : settings.settingsData.title
      ? "| " + settings.settingsData.title
      : ""
  }`;
  const seoData = seo || settings.settingsData.seo;
  const seoTitle = seoData.title;
  const seoDescription = seoData.description;
  const seoKeyword = seoData.keyword;
  const seoImageUrl =
    seoData.image && seoData.image[0] ? seoData.image[0].url : "";
  const pageUrl = url
    ? `${process.env.NEXT_PUBLIC_URL}/${url}`
    : process.env.NEXT_PUBLIC_URL;

  return (
    <Head>
      <title>{titleData}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      
      <meta name="google-site-verification" content="zeHeloeNi3F2PSX6mZyfKkBoIcTOaDwzmDrJJInyK24" />
      
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeyword} />
      <meta name="url" content={pageUrl} />
      <meta itemProp="name" content={seoTitle} />
      <meta itemProp="description" content={seoDescription} />
      <meta itemProp="image" content={seoImageUrl} />
      <meta name="twitter:card" content="product" />
      <meta name="twitter:site" content="@publisher_handle" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:creator" content="@author_handle" />
      <meta name="twitter:image" content={seoImageUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={seoImageUrl} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta
        property="fb:app_id"
        content={settings.settingsData.script.facebookAppId}
      />
      
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9487XPF');
          `,
        }}
      />
      
      {settings.settingsData.favicon[0] && (
        <link rel="shortcut icon" href={settings.settingsData.favicon[0].url} />
      )}

    </Head>
  );
};

export default memo(HeadData);
