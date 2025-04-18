import React from 'react'
import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
const DynNearby = dynamic(() => import('../components/GetNearByPage/GetNearByPage'), {
  ssr: false, // Set to false if you want to load it only on the client side

});
function  getnearbycars({ canonicalUrl }) {
  return (
    <div className='bg-white'>
      <Head>
      <title> Self-Drive Cars: No Deposit, Unlimited KMs</title>
        <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images.." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Self-Drive Cars: No Deposit, Unlimited KMs" />
        <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images.." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'vizag'} phoneno={"96666-99583"}>
        <DynNearby locname={'vizag'} phoneno={"9666699583"}/>
      </Layout>
    </div>
  )
}

export default getnearbycars;

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/vizag/get-near-by-cars`
    : `https://www.longdrivecars.com/vizag/get-near-by-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}