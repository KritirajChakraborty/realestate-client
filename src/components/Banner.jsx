import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className='bg-[url("/bannerImg.jpg")] bg-cover bg-center bg-no-repeat max-w-full md:p-28 p-4'>
      <div className="h-[500px]  mx-auto">
        <div className=" pt-32 flex flex-col gap-3 items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center uppercase">
            enjoy a luxury experience
          </h2>
          <p className="text-center text-slate-800 font-semibold">
            Find the best property according to your needs...
          </p>
          <Link to="/search">
            <button className="bg-slate-100 text-slate-700 border-none font-semibold px-6 py-2 capitalize rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-all duration-300">
              See Collections
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
