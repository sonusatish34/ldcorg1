// pages/sitemap.xml.js
function generateSiteMap() {
    return `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
<url>
<loc>https://www.longdrivecars.com/hyderabad</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>1</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/vizag</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>1</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/vijayawada</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>1</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/warangal</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>1</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/blog</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/gachibowli</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/medipally</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/miyapur</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/ramanthapur</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/secunderabad</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/shamshabad</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/hyderabad-rental-car</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/self-drive-cars-kukatpally</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/self-drive-cars-lbnagar-kothapet</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/self-drive-cars-madhapur</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/dilshuknagar</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/madhapur</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/kukatpally</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/ameerpet</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/self-drive-cars-warangal</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/branches/self-drive-cars-uppal-medipally</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/self-drive-car-rental/ecil</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
<url>
<loc>https://www.longdrivecars.com/attachments</loc>
<lastmod>2025-01-28T06:16:03+00:00</lastmod>
<priority>0.80</priority>
</url>
</urlset>
    `;
}

function SiteMap() {
    // This function doesn't need to return anything as it’s only used for the server-side logic
}

export async function getServerSideProps({ req, res }) {
    const host = req.headers.host;

    // Check if the domain contains ".com"
    if (host.includes('.com)')){
        res.statusCode = 404;
        res.end();
        return {
            props: {},
        };
    }

    // Generate the XML sitemap with manually entered URLs
    const sitemap = generateSiteMap();

    // Set the correct header for XML content
    res.setHeader('Content-Type', 'text/xml');

    // Send the XML sitemap to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
