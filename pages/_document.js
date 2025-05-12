import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/  -touch-icon.png" />
        <link rel="icon" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta id="meta-keywords" name="keywords" content="best car rental, rent a car, car rental, self drive car rental, self drive car, monthly car rental, car on rent without driver, luxury car rental, car rent for one day, booking car rental, airport car rental, online car rental, rentalcars, car on rent without driver, car for rent, car hire, self-drive cars"
        />
        <meta id="meta-keyphrases" name="keyphrases" content="Self-drive car rentals at the best prices in Hyderabad, Luxury and budget-friendly car rentals near you, Affordable self-drive car rental services in Hyderabad"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Long Drive Cars - Self Drive Car Rental",
              "description": "Self Drive Car Rental Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images.",
              "url": "https://www.longdrivecars.com/",
              "aggregateRating": {
                "@type": "AggregateRating",
                "bestRating": "5",
                "ratingValue": "4.8",
                "ratingCount": "33500"
              }
            }),
          }}
        />
      </Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
