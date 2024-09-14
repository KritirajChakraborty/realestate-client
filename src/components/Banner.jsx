import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className='bg-[url("/bannerImg.jpg")] bg-cover bg-center bg-no-repeat max-w-full md:p-28 p-4'>
      <div className="h-[500px]  mx-auto">
        <div className=" pt-32 flex flex-col gap-3 items-center">
          <h2 className="font-primary text-3xl font-semibold text-center uppercase">
            enjoy a luxury experience
          </h2>
          <p className="font-primary text-center text-Black font-semibold">
            Find the best property according to your needs...
          </p>
          <Link to="/search">
            <button className="bg-white text-Black border-none font-semibold px-6 py-2 capitalize rounded-lg hover:bg-black hover:text-white transition-all duration-300">
              See Collections
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
