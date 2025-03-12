import React from 'react'
import ExploreCars from '../components/ExploreCars/ExploreCars'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
function exploreselfdrivecars({ canonicalUrl }) {

  return (
    <div>
      <Head>
        <title>  Unlimited km - Rent a car under 5 kms with Self-drive car rental services</title>
        <meta name="description" content="Plan your trips with Lowest Price Self-Drive car rentals starting at just ₹1488/day. So book Dzire for ₹1680/day or Ertiga at ₹2496/day now with Unlimited kms ." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="  Unlimited km - Rent a car under 5 kms with Self-drive car rental services" />
        <meta property="og:description" content="Plan your trips with Lowest Price Self-Drive car rentals starting at just ₹1488/day. So book Dzire for ₹1680/day or Ertiga at ₹2496/day now with Unlimited kms ." />

        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'warangal'} phoneno={"9000-777-665"}>
        <ExploreCars loc={'warangal'} phoneno={"9000777665"} />
      </Layout>
    </div>
  )
}

export default exploreselfdrivecars

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/warangal/explore-self-drive-cars`
    : `https://www.longdrivecars.com/warangal/explore-self-drive-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}