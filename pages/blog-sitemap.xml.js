
const EXTERNAL_DATA_URL = 'https://api.longdrivecars.in/site/cars-info?location=hyderabad';
import { fireDb } from '@/public/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
const fetchCatAndPosts = async () => {

    try {
        const postsQueryNew = query(collection(fireDb, "blogPost"),
            where("blog_state", "==", "active"),
            where("blogfor", "==", "LDC")
        );
        const postsQuerySnapshotNew = await getDocs(postsQueryNew);
        const postsnew = postsQuerySnapshotNew.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return postsnew
    } catch (err) {
        console.error(err);
    } finally {
    }
};
function generateSiteMap(cars) {


    // fetchCatAndPosts();
    return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${cars?.map((item) => {
        return `
        <url>
            <loc>${`https://www.longdrivecars.com/blog/posts/${item?.slug}`}</loc>
            <changefreq>monthly</changefreq>
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

export async function getServerSideProps({ res }) {
    // Fetch the car data
    const cars = await fetchCatAndPosts(); // Fetching posts using the fixed function


    // Generate the XML sitemap
    const sitemap = generateSiteMap(cars);

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
