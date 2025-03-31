import ContactUS from "../components/ContactUs/ContactUs"
import Layout from "../components/Layout/Layout"
function contact({canonicalUrl}) {

    return (
        <Layout locname={'vizag'} phoneno={"9666699583"}>
            <Head>
                    <title>Self-Drive Cars: No Deposit, Unlimited KMs</title>
                    <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content="Self-Drive Cars: No Deposit, Unlimited KMs" />
                    <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=AW-16731119855"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16731119855');
                    `,
                        }}
                    ></script>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-8RGJTJSJCW">
                    </script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-8RGJTJSJCW');
                    `,
                        }}
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-KBCJDV6F');`,
                        }}
                    />
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
            <ContactUS />
        </Layout>
    )
}

export default contact
export async function getServerSideProps(context) {
    const { req,params } = context; // Extract `params` if using dynamic routes

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