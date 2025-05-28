import React from 'react'
import MakerModel from '../MakerModel'
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
function maker_model({ canonicalUrl }) {
  return (
    <Layout phoneno={'9000-478-478'} wspno={'9000478478'}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />

      </Head>
      <div>
        <MakerModel city={'hyderabad'} phoneno={'9000478478'} wspno={'9000478478'} />
      </div>
    </Layout>
  )
}

export default maker_model;

export async function getServerSideProps({ req, params }) {
  const host = req.headers.host;
  const maker_model = params.maker_model;

  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/car-rental/${maker_model}`
    : `https://www.longdrivecars.com/car-rental/${maker_model}`;

  // Canonical URL logic (you can move this to the component if req is needed)

  return {
    props: {
      canonicalUrl,
    },

  };
}