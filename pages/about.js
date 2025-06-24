import React from 'react'
import Layout from './components/Layout/Layout'
import About from './components/ContactUs/About'
import Head from 'next/head'
function about({ canonicalUrl, data }) {
    console.log('data', data);

    return (
        <Layout phoneno={'9000-478-478'} wspno={'9000478478'}>
            <Head>
                <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
                <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
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
    const { req } = context;
    const host = req.headers.host;
    //     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=86d51960c36a0b664453ee16948001bd
    // `);
    //     const data = await res.json();
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=ab0bffbfe878491098754614251006`);
    const data = await res.json();


    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/about`
        : `https://www.longdrivecars.com/about`;

    return {
        props: {
            canonicalUrl,
            data
        },
    };
}