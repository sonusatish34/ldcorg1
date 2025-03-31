import React from 'react'
import Layout from '../components/Layout/Layout'
import About from '../components/ContactUs/About'
import Head from 'next/head'
function about({canonicalUrl}) {
    return (
        <Layout locname={'hyderabad'} phoneno={'9000-478-478'} wspno={'9666677405'}>
            <Head>
                <title>Self-Drive Cars: No Deposit, Unlimited KMs</title>
                <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Self-Drive Cars: No Deposit, Unlimited KMs" />
                <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
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
            <About />

        </Layout>
    )
}

export default about
export async function getServerSideProps(context) {
    const { req,params } = context; // Extract `params` if using dynamic routes
    const {customlink} = params; // Example fallback for category

    const host = req.headers.host;
    // <link rel="canonical" href={canonicalUrl} />
    // Ensure that the category is lowercase, as it's used in the URL
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/${customlink}/about`
        : `https://www.longdrivecars.com/${customlink}/about`;

    return {
        props: {
            canonicalUrl,
        },
    };
}