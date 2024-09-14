import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { Link } from 'react-router-dom';

export default function BestProperties() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/listing/getall?limit=8');
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListings(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Something unexpected happened! Please try after sometime!');
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="flex flex-col gap-4 text-center justify-between max-w-6xl mx-auto p-4 my-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">
        Best Properties available
      </h2>
      <p>
        Our platform offers a curated selection of the finest properties, each
        handpicked for its luxury, comfort, and prime location. Whether you're
        looking for modern city apartments or serene countryside homes, we
        ensure that every listing meets the highest standards for quality and
        value.
      </p>
      {listings.length === 0 && loading && <p>Loading...</p>}
      {listings.length === 0 && !loading && error && (
        <p className="text-red-600 text-sm text-center">Error: {error}</p>
      )}
      {listings.length > 0 && !loading && !error && (
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="pl-5"
          >
            {listings.map(listing => (
              <SwiperSlide key={listing._id} className="!mb-5">
                <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={
                        listing.imageURLs[0] ||
                        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.architecturaldigest.com%2Fstory%2Fhoteltrends&psig=AOvVaw2tENo2EsCIhPa5RVwuIwFo&ust=1726074274784000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjH1vXtuIgDFQAAAAAdAAAAABAE'
                      }
                      alt="listing cover"
                      className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-3 w-full items-center">
                      <p className="text-gray-600 text-lg font-semibold text-center">
                        {listing.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
