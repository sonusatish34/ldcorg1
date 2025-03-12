import React from 'react';
import MakerModel from '../../MakerModel';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <div>
      <Head>
        <title> No Deposit &   Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag</title>
        <meta name="description" content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit &  Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" No Deposit &   Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag" />
        <meta property="og:description" content="Rent a 5 Seater - Dzire for ₹1680/day with No Deposit &  Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'vizag'} phoneno={'96666-99583'}>
        <MakerModel city={'vizag'} phoneno={'9666699583'} />
      </Layout>
    </div>

  )
}

export default maker_model;

export async function getServerSideProps(context) {
  const { maker_model } = context.params;
  const host = context.req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/vizag/car-rental/${maker_model}`
    : `https://www.longdrivecars.com/vizag/car-rental/${maker_model}`;
  return {
    props: {
      canonicalUrl,
    },
  };
}