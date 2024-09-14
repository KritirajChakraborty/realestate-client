import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/review/get');
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setReviews(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError('Something unexpected happened. Please try after sometime!');
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col gap-4 mx-auto text-center justify-between p-3 my-10 max-w-6xl">
      <h2 className="text-2xl sm:3xl text-center font-bold">
        Reviews from our customers
      </h2>
      <p className="text-center text-slate-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, omnis
        iure recusandae blanditiis at commodi quisquam ut voluptatibus voluptas
        odio!
      </p>
      {reviews.length === 0 && loading && <p>Loading...</p>}
      {reviews.length === 0 && !loading && error && (
        <p className="text-red-600 text-sm text-center">Error: {error}</p>
      )}
      {reviews.length > 0 && !loading && !error && (
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="pl-8"
          >
            {reviews.map(review => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col gap-2 bg-slate-200 p-3 rounded-lg w-[220px] h-[180px]">
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={review.photoURL}
                      alt="photo"
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="text-slate-700 font-bold">{review.name}</p>
                  </div>

                  <div className="text-left text-slate-600 break-words">
                    <p>{review.review}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
