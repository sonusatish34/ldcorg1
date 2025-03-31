import React from 'react';
import MakerModel from '../../MakerModel';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <div>
      <Head>
        <title>No Deposit &  Self-Drive Cars: No Deposit, Unlimited KMs</title>
        <meta name="description" content="Plan your trips with Lowest Price Self-Drive car rentals starting at just ₹1488/day. So book Dzire for ₹1680/day or Ertiga at ₹2496/day now withNo Deposit & Unlimited kms ." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="No Deposit &  Self-Drive Cars: No Deposit, Unlimited KMs" />
        <meta property="og:description" content="Plan your trips with Lowest Price Self-Drive car rentals starting at just ₹1488/day. So book Dzire for ₹1680/day or Ertiga at ₹2496/day now with No Deposit & Unlimited kms ." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'warangal'} phoneno={"9000-777-665"}>
        <MakerModel city={'warangal'} phoneno={'9000777665'} />
      </Layout>
    </div>

  )
}

export default maker_model;

export async function getServerSideProps(context) {
  const { maker_model } = context.params; // Extract the dynamic route parameter
  const host = context.req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/warangal/car-rental/${maker_model}`
    : `https://www.longdrivecars.com/warangal/car-rental/${maker_model}`; // Use localhost for dev
  return {
    props: {
      canonicalUrl,
    },
  };
}