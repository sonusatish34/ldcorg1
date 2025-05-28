import React from 'react';
import dynamic from 'next/dynamic';
import Layout from './components/Layout/Layout';
import Head from 'next/head';

const ExploreCars = dynamic(() => import('./components/ExploreCars/ExploreCars'), {
  ssr: false,
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
      <Layout phoneno={'9000-478-478'} wspno={'9000478478'}>
        <ExploreCars phoneno={"9000478478"} wspno={"9000478478"} />
      </Layout>
    </div>
  );
}

export default exploreselfdrivecars;

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/explore-self-drive-cars`
    : `https://www.longdrivecars.com/explore-self-drive-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}