import React from 'react';
import MakerModel from '../../MakerModel';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <div>
      <Head>
        <title> Self-Drive Cars: No Deposit, Unlimited KMs </title>
        <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Self-Drive Cars: No Deposit, Unlimited KMs " />
        <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'hyderabad'} phoneno={'9000-478-478'} wspno={'9666677405'}>
        <MakerModel city={'hyderabad'} phoneno={'9000478478'} wspno={'9666677405'} />
      </Layout>
    </div>
  )
}

export default maker_model;

export async function getServerSideProps(context) {
  const { maker_model } = context.params; // Extract the dynamic route parameter
  const host = context.req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/hyderabad/car-rental/${maker_model}`
    : `https://www.longdrivecars.com/hyderabad/car-rental/${maker_model}`; // Use localhost for dev
  return {
    props: {
      canonicalUrl,
    },
  };
}