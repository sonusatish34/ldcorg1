import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ResultsPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);

  const { duration, min, max, destinations } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const selected = {
        duration,
        priceRange: [Number(min), Number(max)],
        destinations: destinations?.split(',') || [],
      };

      // 🔥 MOCK DATA: You can later fetch from API or CMS
      const mockPackages = [
        {
          id: 1,
          title: "Goa Beach Getaway",
          destination: "Goa",
          days: 5,
          price: 6500,
          image: "https://yu-hotel.com/wp-content/uploads/2023/03/best-luxury-hotels-in-north-goa-YU-Hotel-1160x773.jpg",
        },
        {
          id: 2,
          title: "Kerala Backwater Tour",
          destination: "Kerala",
          days: 7,
          price: 7500,
          image: "/https://yu-hote/03/best-luxury-hotels-in-kerala01160x773.jpg",
        },
      ];

      const filtered = mockPackages.filter(pkg => {
        const inPrice = pkg.price >= selected.priceRange[0] && pkg.price <= selected.priceRange[1];
        const inDest = selected.destinations.includes(pkg.destination);
        const inDuration = selected.duration === "8+" ? pkg.days >= 8
          : selected.duration === "4-7" ? pkg.days >= 4 && pkg.days <= 7
            : pkg.days <= 3;
        return inPrice && inDest && inDuration;
      });

      setPackages(filtered);
    }
  }, [router.isReady, duration, min, max, destinations]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Suggested Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {packages.length === 0 && (
          <p className="text-center col-span-full text-gray-600 text-xl">No packages found.</p>
        )}
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={pkg.image} alt={pkg.title} className="w-full h-56 object-cover" />
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold">{pkg.title}</h2>
              <p className="text-gray-600">Destination: {pkg.destination}</p>
              <p className="text-gray-600">Duration: {pkg.days} Days</p>
              <p className="text-indigo-600 font-bold text-lg">₹{pkg.price}</p>
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
