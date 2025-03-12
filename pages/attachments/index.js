import { useEffect, useState } from 'react';  // Import useState and useEffect hooks
import { useRouter } from 'next/router';      // Import useRouter for routing
import Head from 'next/head';
import Navbar from "./components/navbar";
import Banner from "./components/Banner";
import Second from "./components/second";
import AttachmentHelp from './components/Attachmenthelp';
import CallBackSection from './components/callsection';
import CarEarningDashboard from './components/CarEarningsDashboard';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CarEarningsSection from './components/CarEarningsSection';
import Sliderpage from './components/Slider';
import CarFeatures from './components/Carfeatures';

export default function Home() {
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {  // Wait until the router is ready
      const fullUrl = `${window.location.origin}${router.asPath}`;
      setCanonicalUrl(fullUrl);  // Set the canonical URL
    }
  }, [router.isReady, router.asPath]);  // Update when router changes

  return (
    <div className='text-white'>
      <Head>
        <title>Attach Your Car to Long Drive Cars App and Start Earning Today</title>
        <meta name="description" content="Turn your car into a steady income source, Earn ₹10k-₹50k/month with Long Drive Cars. Free service every 10,000 kms. Diesel 2008+ & petrol &Diesel 2014+." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Attach Your Car to Long Drive Cars App and Start Earning Today" />
        <meta property="og:description" content="Turn your car into a steady income source, Earn ₹10k-₹50k/month with Long Drive Cars. Free service every 10,000 kms. Diesel 2008+ & petrol &Diesel 2014+." />

        {/* Only render canonical link once the URL is set */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>

      <Navbar />
      <Banner />
      <Second />
      <AttachmentHelp />
      <Sliderpage />
      <CarFeatures />
      <CallBackSection />
      <CarEarningDashboard />
      <CarEarningsSection />
      <Faq />
      <Footer />
    </div>
  );
}
