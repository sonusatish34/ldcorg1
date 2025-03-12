import React from 'react';
import MakerModel from '../../MakerModel';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <div>
      <Head>
        <title> Check Real Car Images and Book Self-drive cars with No deposit </title>
        <meta name="description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Check Real Car Images and Book Self-drive cars with No deposit " />
        <meta property="og:description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'hyderabad'} phoneno={'9666-677-405'}>
        <MakerModel city={'hyderabad'} phoneno={'9666677405'} />
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