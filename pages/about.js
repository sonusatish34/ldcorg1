import React from 'react'
import Layout from './components/Layout/Layout'
import About from './components/ContactUs/About'
import Head from 'next/head'
function about({canonicalUrl}) {
    return (
        <Layout phoneno={'9000-478-478'} wspno={'9666677405'}>
            <Head>
                <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
                <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-16731119855"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16731119855');
                    `,
                    }}
                ></script>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-8RGJTJSJCW">
                </script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-8RGJTJSJCW');
                    `,
                    }}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-KBCJDV6F');`,
                    }}
                />
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <div>
                <About />
            </div>
        </Layout>
    )
}

export default about
export async function getServerSideProps(context) {
    const { req,params } = context; 
    const host = req.headers.host;
   
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/about`
        : `https://www.longdrivecars.com/about`;

    return {
        props: {
            canonicalUrl,
        },
    };
}