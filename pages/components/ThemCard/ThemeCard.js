import Image from 'next/image';
const  ThemeCard = ({ title, image })=> {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold drop-shadow-md">{title}</h3>
      </div>
    </div>
  );
}
export default ThemeCard;
