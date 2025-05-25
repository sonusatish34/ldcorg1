import React from 'react'
import Layout from '../components/Layout/Layout'
import About from '../components/ContactUs/About'
import Head from 'next/head'
function about({ canonicalUrl }) {
    return (
        <Layout locname={'warangal'} phoneno={"9000-777-665"}>
            <Head>
                <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
                <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />

                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <About />
        </Layout>
    )
}

export default about
export async function getServerSideProps(context) {
    const { req } = context; // Extract `params` if using dynamic routes

    const host = req.headers.host;
    // <link rel="canonical" href={canonicalUrl} />
    // Ensure that the category is lowercase, as it's used in the URL
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/warangal/about`
        : `https://www.longdrivecars.com/warangal/about`;

    return {
        props: {
            canonicalUrl,
        },
    };
}