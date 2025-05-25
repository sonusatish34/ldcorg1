import Head from "next/head";
import ContactUS from "../components/ContactUs/ContactUs"
import Layout from "../components/Layout/Layout"
import { useRouter } from "next/router";
function contact({ pars, canonicalUrl }) {
    const router = useRouter();
    const { customlink } = router.query; // Extract `params` if using dynamic routes
    // const { maker_model } = router.query;


    return (
        <Layout locname={`${customlink}`} phoneno={"9000-478-478"}>
            <Head>
                <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
                <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />

                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <ContactUS />
        </Layout>
    )
}

export default contact
export async function getServerSideProps(context) {
    const { req, params } = context; // Extract `params` if using dynamic routes
    const { customlink } = params; // Example fallback for category

    const host = req.headers.host;
    // <link rel="canonical" href={canonicalUrl} />
    // Ensure that the category is lowercase, as it's used in the URL
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/${customlink}/contact.html`
        : `https://www.longdrivecars.com/${customlink}/contact.html`;

    return {
        props: {
            canonicalUrl,
        },
    };
}