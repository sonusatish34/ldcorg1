import React from 'react'
import ExploreCars from '../components/ExploreCars/ExploreCars'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
function exploreselfdrivecars({ canonicalUrl }) {

  return (
    <div>
      <Head>
        <title>Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images.</title>
        <meta name="description" content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit & Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
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