import destinations from '../comps/destinations.json';
import Image from 'next/image';

export default function DestinationGrid2() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 gap-4">
      {destinations.map((dest, index) => (
        <div key={index} className="text-center">
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src={dest.image}
              alt={dest.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover"
            />
          </div>
          <h4 className="mt-2 text-sm font-medium">{dest.name}</h4>
        </div>
      ))}
    </div>
  );
}
