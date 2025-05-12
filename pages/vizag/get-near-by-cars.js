import React from 'react'
import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
const DynNearby = dynamic(() => import('../components/GetNearByPage/GetNearByPage'), {
  ssr: false, // Set to false if you want to load it only on the client side

});
function getnearbycars({ canonicalUrl }) {
  return (
    <div className='bg-white'>
      <Head>
        <title> No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
        <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
        <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'vizag'} phoneno={"96666-99583"}>
        <DynNearby locname={'vizag'} phoneno={"9666699583"} />
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