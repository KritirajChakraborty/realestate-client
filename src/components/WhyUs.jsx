import { FaLeaf, FaLocationDot } from 'react-icons/fa6';
import { GiSofa } from 'react-icons/gi';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';

export default function WhyUs() {
  return (
    <div className="flex flex-col gap-4 text-center justify-between max-w-6xl mx-auto p-4 my-10">
      <h2 className="text-2xl sm:text-3xl text-slate-800 font-bold capitalize">
        Why we do?
      </h2>
      <p className="text-slate-700">
        Our platform offers an intuitive experience, ensuring you find your
        ideal home quickly. Discover luxury, comfort, and convenience, all in
        one place.
      </p>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-4 justify-between">
        <div className="flex flex-col gap-4 items-center justify-between bg-slate-200 border-none p-3 rounded-lg shadow-md hover:bg-white hover:border-slate-500 object-cover hover:scale-105 transition-scale duration-300">
          <FaLocationDot className="text-6xl text-blue-800 bg-slate-100 rounded-full p-3" />
          <h3 className="text-xl text-slate-800 font-semibold">
            Prime Location
          </h3>
          <p className="text-sm text-slate-700">
            Our properties are situated in the most desirable neighborhoods,
            offering close proximity to essential amenities like schools,
            hospitals, shopping centers, and public transportation. Whether
            you're looking for a peaceful suburb or a vibrant city life, we've
            got you covered.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-between bg-slate-200 border-none p-3 rounded-lg shadow-md hover:bg-white hover:border-slate-500 object-cover hover:scale-105 transition-scale duration-300">
          <GiSofa className="text-6xl text-blue-800 bg-slate-100 rounded-full p-3" />
          <h3 className="text-xl text-slate-800">Luxury and comfort</h3>
          <p className="text-sm text-slate-700">
            Experience the perfect blend of luxury and comfort. Our properties
            feature spacious interiors, high-end finishes, and modern designs
            tailored to suit a variety of lifestyles. Enjoy open living spaces,
            state-of-the-art kitchens, and premium furnishings for a truly
            elevated living experience.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-between bg-slate-200 border-none p-3 rounded-lg shadow-md hover:bg-white hover:border-slate-500 object-cover hover:scale-105 transition-scale duration-300">
          <RiMoneyRupeeCircleFill className="text-6xl text-blue-800 bg-slate-100 rounded-full p-3" />
          <h3 className="text-xl text-slate-800">Affordability</h3>
          <p className="text-sm text-slate-700">
            Quality living shouldn’t come with an overwhelming price tag. We
            offer competitively priced homes with flexible payment options,
            ensuring that your dream home is within reach. Whether you're
            renting or buying, we provide properties that offer great value for
            money.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-between bg-slate-200 border-none p-3 rounded-lg shadow-md hover:bg-white hover:border-slate-500 object-cover hover:scale-105 transition-scale duration-300">
          <FaLeaf className="text-6xl text-blue-800 bg-slate-100 rounded-full p-3" />
          <h3 className="text-xl text-slate-800">Sustainability</h3>
          <p className="text-sm text-slate-700">
            Our commitment to sustainability is reflected in every property we
            offer. Equipped with energy-efficient systems, eco-friendly
            materials, and green living spaces, our properties help reduce your
            carbon footprint while saving on energy costs.
          </p>
        </div>
      </div>
    </div>
  );
}
