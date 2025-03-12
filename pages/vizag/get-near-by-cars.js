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
      <title> No Deposit & Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag</title>
        <meta name="description" content="Rent a 5 Seater- Dzire for ₹1680/day with Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="No Deposit &  Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag" />
        <meta property="og:description" content="Rent a 5 Seater- Dzire for ₹1680/day with Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
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