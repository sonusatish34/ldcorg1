import React from 'react';
import MakerModel from '../../MakerModel';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <div>
      <Head>
        <title> No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U </title>
        <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U " />
        <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
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
  const { maker_model } = context.params; 
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