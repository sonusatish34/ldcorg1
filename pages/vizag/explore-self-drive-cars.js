import React from 'react'
import ExploreCars from '../components/ExploreCars/ExploreCars'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
function exploreselfdrivecars({ canonicalUrl }) {

  return (
    <div>
      <Head>
        <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
        <meta name="description" content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit & Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
        <meta property="og:description" content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit & Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'vizag'} phoneno={"96666-99583"}>

        <ExploreCars loc={'vizag'} phoneno={"9666699583"} />
      </Layout>
    </div>

  )
}

export default exploreselfdrivecars

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/vizag/explore-self-drive-cars`
    : `https://www.longdrivecars.com/vizag/explore-self-drive-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}