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
        <title> Check Real Car Images and Book Self-drive cars with No deposit </title>
        <meta name="description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content=" Check Real Car Images and Book Self-drive cars with No deposit " />
        <meta property="og:description" content="Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day.You can also check Real Car Images on the Long Drive Cars App." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Layout locname={'hyderabad'} phoneno={'9666-677-405'}>
        <ExploreCars loc={'hyderabad'} phoneno={"9666677405"} />
      </Layout>
    </div>
  );
}

export default exploreselfdrivecars;

export async function getServerSideProps({ req }) {

  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/hyderabad/explore-self-drive-cars`
    : `https://www.longdrivecars.com/hyderabad/explore-self-drive-cars`;
  return {
    props: {
      canonicalUrl,
    },
  };
}