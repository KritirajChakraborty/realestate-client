import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [contact, setContact] = useState(true);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setListing(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && (
        <p className="text-center text-2xl font-semibold my-7">Loading...</p>
      )}
      {error && (
        <div className="p-3">
          <p className="text-center text-2xl font-semibold mt-7 text-red-700 uppercase">
            Something went wrong!!!
          </p>
          <Link to="/profile">
            <p className="text-semibold hover:text-red-700 text-center">
              Go to profile page..
            </p>
          </Link>
        </div>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageURLs.map(url => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[15%] right-[5%] z-10 border rounded-full bg-slate-100 cursor-pointer w-12 h-12 flex items-center justify-center">
            <FaShare
              className="text-slate-700"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => {
                  setLinkCopied(false);
                }, 2000);
              }}
            />
            {linkCopied && (
              <p className="fixed top-[23%] right-[9%] border rounded-md bg-slate-100 text-slate-700 font-semibold p-2 uppercase">
                Link Copied!
              </p>
            )}
          </div>
          <div className="flex flex-col max-w-4xl mx-auto my-7 p-3 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ₹{' '}
              {listing.type === 'rent'
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && '/ month'}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-2 justify-left">
              <p className="bg-green-800 text-slate-100 border rounded-lg py-2 px-4">
                {listing.type === 'rent' ? 'For rent' : 'For sale'}
              </p>
              {listing.offers && (
                <p className="bg-red-700 text-slate-100 border rounded-lg py-2 px-4">
                  Discount - ₹{+listing.regularPrice - +listing.discountPrice}{' '}
                  OFF
                </p>
              )}
            </div>
            <p>
              <span
                className="text-md font-semibold
              "
              >
                Description:{' '}
              </span>
              {listing.description}
            </p>
            <ul className="flex flex-wrap gap-4 sm:gap-6">
              <li className="flex gap-1 items-center whitespace-nowrap text-green-700">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : '1 bed'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-green-700">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : '1 bathrooms'}
              </li>
              <li
                className={`flex items-center gap-1 whitespace-nowrap ${
                  listing.parking ? 'text-green-700' : 'text-red-700'
                }`}
              >
                <FaParking className="text-lg" />
                {listing.parking ? 'Parking slot' : 'No parking'}
              </li>
              <li
                className={`flex items-center gap-1 whitespace-nowrap ${
                  listing.furnished ? 'text-green-700' : 'text-red-700'
                }`}
              >
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && contact && (
              <button
                onClick={() => setContact(false)}
                className="w-full bg-slate-700 text-slate-100 rounded-lg border p-3 items-center uppercase hover:bg-slate-800"
              >
                Contact landlord
              </button>
            )}
            {listing.userRef !== currentUser._id && contact && (
              <Contact listing={listing} />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
