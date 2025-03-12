import React from 'react'
import ExploreCars from '../components/ExploreCars/ExploreCars'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
function exploreselfdrivecars({ canonicalUrl }) {

  return (

    <div>
      <Head>
        <title>No Deposit & Unlimited km - Travel with low-cost Self drive car rentals services</title>
        <meta name="description" content="Explore with Self-drive cars starting at ₹1488/day. With low prices, Book Dzire ₹1680/day,Ertiga ₹2496/day or Install Long Drive Cars app for more options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="  Unlimited km - Travel with low-cost Self drive car rentals services" />
        <meta property="og:description" content="Explore with Self-drive cars starting at ₹1488/day. With low prices, Book Dzire ₹1680/day,Ertiga ₹2496/day or Install Long Drive Cars app for more options." />

        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'vijayawada'} phoneno={"96666-99583"}>

        <ExploreCars loc={'vijayawada'} phoneno={"9666699583"} />
      </Layout>
    </div>
  )
}

export default exploreselfdrivecars

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/vijayawada/explore-self-drive-cars`
    : `https://www.longdrivecars.com/vijayawada/explore-self-drive-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}