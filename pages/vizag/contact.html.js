import ContactUS from "../components/ContactUs/ContactUs"
import Layout from "../components/Layout/Layout"
import Head from "next/head"
function contact({ canonicalUrl }) {

    return (
        <Layout locname={'vizag'} phoneno={"9666699583"}>
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

    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/vizag/contact.html`
        : `https://www.longdrivecars.com/vizag/contact.html`;

    return {
        props: {
            canonicalUrl,
        },
    };
}