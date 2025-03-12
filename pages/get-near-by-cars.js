import React from 'react'
import dynamic from 'next/dynamic';
import Layout from './components/Layout/Layout';
import Head from 'next/head';
const DynNearby = dynamic((canonical) => import('./components/GetNearByPage/GetNearByPage'), {
  ssr: false, // Set to false if you want to load it only on the client side
});

function getnearbycars({ canonicalUrl }) {
  return (
    <div className='bg-white'>
      <Head>
        <title> Check Real Car Images and Book Self-drive cars with No deposit </title>
        <meta name="description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Check Real Car Images and Book Self-drive cars with No deposit " />
        <meta property="og:description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'hyderabad'} phoneno={'9666-677-405'}>
        <DynNearby locname={'hyderabad'} phoneno={'9666677405'} />
      </Layout>
    </div>
  )
}

export default getnearbycars;


export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/hyderabad/get-near-by-cars`
    : `https://www.longdrivecars.com/hyderabad/get-near-by-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}