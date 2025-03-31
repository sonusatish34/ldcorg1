import React from 'react'
import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
const DynNearby = dynamic((canonical) => import('../components/GetNearByPage/GetNearByPage'), {
  ssr: false, // Set to false if you want to load it only on the client side
});

function getnearbycars({ canonicalUrl }) {
  return (
    <div className='bg-white'>
      <Head>
        <title> Self-Drive Cars: No Deposit, Unlimited KMs </title>
        <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Self-Drive Cars: No Deposit, Unlimited KMs " />
        <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Layout locname={'hyderabad'} phoneno={'9000-478-478'} wspno={'9666677405'}>
        <DynNearby locname={'hyderabad'} phoneno={'9000478478'} wspno={'9666677405'} />
      </Layout>
    </div>
  )
}

export default getnearbycars;


export async function getServerSideProps(context) {
  const { req, params } = context; // Extract `params` if using dynamic routes
  const { customlink } = params; // Example fallback for category

  const host = req.headers.host;
  // <link rel="canonical" href={canonicalUrl} />
  // Ensure that the category is lowercase, as it's used in the URL
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/${customlink}/get-near-by-cars`
    : `https://www.longdrivecars.com/${customlink}/get-near-by-cars`;

  return {
    props: {
      canonicalUrl,
    },
  };
}