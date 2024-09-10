import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingCart({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageURLs[0] ||
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.architecturaldigest.com%2Fstory%2Fhoteltrends&psig=AOvVaw2tENo2EsCIhPa5RVwuIwFo&ust=1726074274784000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjH1vXtuIgDFQAAAAAdAAAAABAE'
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="flex flex-col gap-2 p-3 w-full">
          <p className="text-gray-600 text-lg font-semibold p-3">
            {listing.name}
          </p>
          <div className="flex gap-2 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-gray-600 italic text-sm w-full truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-gray-800 text-sm line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-700 font-semibold mt-2">
            {'₹'}
            {listing.offers
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex gap-4 text-slate-700">
            <div className="font-semibold text-xs">
              {listing.beds > 1 ? `${listing.beds} beds` : '1 bed'}
            </div>
            <div className="font-semibold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : '1 bathroom'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
