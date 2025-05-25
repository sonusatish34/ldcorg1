import ContactUS from "../components/ContactUs/ContactUs"
import Head from "next/head"
import Layout from "../components/Layout/Layout"
function contact({ canonicalUrl }) {

    return (
        <Layout locname={'warangal'} phoneno={"9000-777-665"}>
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
    const { req } = context; // Extract `params` if using dynamic routes

    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/warangal/contact.html`
        : `https://www.longdrivecars.com/warangal/contact.html`;

    return {
        props: {
            canonicalUrl,
        },
    };
}