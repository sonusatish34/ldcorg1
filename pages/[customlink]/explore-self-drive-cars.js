import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';

// Dynamically import the ExploreCars component
const ExploreCars = dynamic(() => import('../components/ExploreCars/ExploreCars'), {
  ssr: false, // Set to false if you want to load it only on the client side
});

function exploreselfdrivecars({ canonicalUrl }) {
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
      <Layout locname={'hyderabad'} phoneno={'9000-478-478'} wspno={'9000478478'}>
        <ExploreCars loc={'hyderabad'} phoneno={"9000478478"} wspno={'9000478478'} />
      </Layout>
    </div>
  );
}

export default exploreselfdrivecars;

export async function getServerSideProps(context) {
  const { req, params } = context; // Extract `params` if using dynamic routes
  const { customlink } = params; // Example fallback for category

  const host = req.headers.host;
  // <link rel="canonical" href={canonicalUrl} />
  // Ensure that the category is lowercase, as it's used in the URL
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/${customlink}/explore-self-drive-cars`
    : `https://www.longdrivecars.com/${customlink}/explore-self-drive-cars`;

  return {
    props: {
      canonicalUrl,
    },
  };
}