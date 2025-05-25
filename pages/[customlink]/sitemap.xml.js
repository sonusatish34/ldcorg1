
const EXTERNAL_DATA_URL = 'https://api.longdrivecars.in/site/cars-info?location=hyderabad';

function generateSiteMap(cars) {
    return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.longdrivecars.com/hyderabad</loc>
            <changefreq>monthly</changefreq>
            <priority>1</priority>
        </url>
        <url>
            <loc>https://www.longdrivecars.com/hyderabad/about</loc>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>https://www.longdrivecars.com/hyderabad/contact.html</loc>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>https://www.longdrivecars.com/hyderabad/get-near-by-cars</loc>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
        </url>
        <url>
            <loc>https://www.longdrivecars.com/hyderabad/explore-self-drive-cars</loc>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        

       ${cars?.map((item) => {
        return `

        <url>
            <loc>${`https://www.longdrivecars.com/hyderabad/car-rental/${item?.maker_model.replaceAll(' ','-').toLowerCase()}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
       `;
    })
            .join('')}
     </urlset>
   `;
}

function SiteMap() {
    // This will be handled by getServerSideProps, no need for content in the component itself
}

export async function getServerSideProps({ res, req }) {
    // Fetch the car data
    const host = req.headers.host;

    const response = await fetch(EXTERNAL_DATA_URL);
    const items = await response.json();
    // const cars = ['book-a-rental-car-in-hyderabad','sedan-cars-for-rent-in-hyderabad','cars-rental-services-in-hyderabad'];
    const cars = items?.data?.results;
    
      const  sitemap = generateSiteMap(cars)
    
    // Generate the XML sitemap

    // Set the response header for XML
    res.setHeader('Content-Type', 'text/xml');

    // Write the generated sitemap to the response
    res.write(sitemap);
    res.end();

    return {
        props: {}, // No page props are needed for the sitemap
    };
}

export default SiteMap;




//correct
// const EXTERNAL_DATA_URL = 'https://api.longdrivecars.in/site/cars-info?location=hyderabad';

// function generateSiteMap(cars) {
//     return `
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <url>
//             <loc>https://www.longdrivecars.com/hyderabad</loc>
//             <changefreq>monthly</changefreq>
//             <priority>1</priority>
//         </url>

//        ${cars?.map((item) => {
//         return `
//         <url>
//             <loc>${`https://www.longdrivecars.com/hyderabad/car-rental/${item?.maker_model.replaceAll(' ', '-').toLowerCase()}`}</loc>
//             <changefreq>monthly</changefreq>
//             <priority>0.9</priority>
//         </url>
//        `;
//     })
//             .join('')}
//     </urlset>
//    `;
// }

// function SiteMap() {
//     // This will be handled by getServerSideProps, no need for content in the component itself
// }

// export async function getServerSideProps({ res, req }) {
//     // Get the host from the request headers
//     const host = req.headers.host;

//     // Fetch car data
//     const response = await fetch(EXTERNAL_DATA_URL);
//     const items = await response.json();
//     const cars = items?.data?.results;

//     let sitemap = null;  // Start with no sitemap

//     // Check if the host contains '.com'
//     if (host.includes('.com') || host === 'localhost:3001') {
//         sitemap = generateSiteMap(cars);  // Generate the sitemap only if host contains '.com'
//     }

//     // Set the response header for XML (if sitemap exists)
//     res.setHeader('Content-Type', 'text/xml');

//     if (sitemap) {
//         // Write the generated sitemap to the response
//         res.write(sitemap);
//     } else {
//         // If no sitemap, return a 404 or handle accordingly
//         res.statusCode = 404;
//         res.end();
//         return {
//             props: {},  // No props needed in this case
//         };
//     }

//     res.end();
//     return {
//         props: {},  // No page props are needed for the sitemap
//     };
// }

// export default SiteMap;

// pages/sitemap.xml.js

// function generateSiteMap() {
//   const keywordslist = [
//     "book-a-rental-car-in-hyderabad",
//     "book-best-rental-car-in-hyderabad-at-low-prices",
//     "self-drive-cars-near-me-in-hyderabad-no-deposit-unlimited-kilometers",
//     "sedan-cars-for-rent-in-hyderabad",
//     "sedan-car-rental-in-hyderabad",
//     "cars-rental-services-in-hyderabad",
//     "lowest-cost-car-rental-services-in-hyderabad",
//     "suv-cars-for-rent-in-hyderabad",
//     "book-best-rental-car-for-a-month-in-hyderabad-at-low-prices",
//     "book-a-brezza-car-for-1-month-on-rent-in-hyderabad",
//     "self-drive-cars-hyderabad",
//     "car-rental-services",
//     "car-rental-services-in-hyderabad",
//     "car-for-rent-in-hyderabad",
//     "rental-cars-in-hyderabad",
//     "rent-a-car-in-hyderabad",
//     "car-rentals-in-hyderabad",
//     "self-drive-cars-hyderabad",
//     "car-rental-services",
//     "car-rental-services-in-hyderabad",
//     "car-for-rent-in-hyderabad",
//     "rental-cars-in-hyderabad",
//     "rent-a-car-in-hyderabad",
//     "car-rentals-in-hyderabad",
//     "self-drive-cars-in-hyderabad",
//     "self-drive-cars-kukatpally",
//     "self-drive-cars-near-me",
//     "best-self-drive-car-rental-hyderabad",
//     "best-self-drive-car-in-hyderabad",
//     "car-rental-hyderabad",
//     "rental-cars-hyderabad",
//     "car-on-rent-hyderabad",
//     "self-drive-cars-in-madhapur",
//     "self-drive-cars-in-dilshuknagar",
//     "self-drive-cars-in-uppal",
//     "self-drive-cars-in-ecil",
//     "self-drive-cars-in-gachibowli",
//     "car-rental-in-uppal"
//   ];
//   return `
//     <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${keywordslist?.map((item) => {
//     return `
     
//       <sitemap>
//         <loc>http://longdrivecars.com/hyderabad/${item}/sitemap.xml</loc>
//       </sitemap>
//      `;
//   })
//       .join('')}
//       <sitemap>
//         <loc>http://longdrivecars.com/hyderabad//sitemap.xml</loc>
//       </sitemap>
//   </sitemapindex>
//      `;
// }

// function SiteMap() {
//   // This function doesn't need to return anything as it’s only used for the server-side logic
// }

// export async function getServerSideProps({ res }) {
//   // Generate the XML sitemap with manually entered URLs
//   const sitemap = generateSiteMap();

//   // Set the correct header for XML content
//   res.setHeader('Content-Type', 'text/xml');

//   // Send the XML sitemap to the browser
//   res.write(sitemap);
//   res.end();
//   return {
//     props: {},
//   };
// }

// export default SiteMap;


