// import "@/styles/globals.css";
// import React from 'react';

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
    
//       <Component {...pageProps} />
//     </>
//   );
// }
// export default MyApp;
// pages/_app.js
import Script from 'next/script';
import '../styles/globals.css'; // or your CSS

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16731119855"
        strategy="lazyOnload"
      />

      <Script
        id="gtag-init-aw"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16731119855');
          `,
        }}
      />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8RGJTJSJCW"
        strategy="lazyOnload"
      />

      <Script
        id="gtag-init-ga4"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RGJTJSJCW', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Script
        id="gtm-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBCJDV6F');
          `,
        }}
      />

      <Component {...pageProps} />
    </>
  );
}

