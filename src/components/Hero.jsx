import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto max-w-6xl p-4 my-5 sm:my-10 ">
      <div className="md:w-1/2 flex-grow pt-1.5 lg:pt-0">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center sm:text-left font-bold capitalize text-slate-700 p-3">
          Your trusted <span className="text-slate-800">real estate</span>{' '}
          advisors
        </h2>
        <div className="grid grid-cols-2 gap-3 items-center text-center p-3">
          <div className="flex flex-col justify-center text-left gap-2 border-2 p-3 rounded-lg h-24 w-30 lg:h-40  text-slate-800 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200">
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize">
              52+
            </h3>
            <p className="text-sm font-semibold capitalize">
              Satisfied customers
            </p>
          </div>
          <div className="flex flex-col justify-center text-left gap-2 border-2 p-3 rounded-lg h-24 w-30 lg:h-40  text-slate-800 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200">
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize">
              5+
            </h3>
            <p className="text-sm font-semibold capitalize">
              Years of experience
            </p>
          </div>
          <div className="flex flex-col justify-center text-left gap-2 border-2 p-3 rounded-lg h-24 w-30 lg:h-40  text-slate-800 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200">
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize">
              10+
            </h3>
            <p className="text-sm font-semibold capitalize">Awards</p>
          </div>
          <div className="flex flex-col justify-center text-left gap-2 border-2 p-3 rounded-lg h-24 w-30 lg:h-40  text-slate-800 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200">
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold capitalize">
              100+
            </h3>
            <p className="text-sm font-semibold capitalize">Properties</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex-grow pt-1.5 lg:pt-0 xl:pt-6">
        <div className="flex flex-col gap-4 p-3 justify-between w-full h-full ">
          <h3 className="text-sm lg:text-lg font-semibold text-center">
            A cutting edge real estate agent that offers a seamless and
            immersive experience for finding your dream home at the heart of
            your city.
          </h3>
          <div className="flex flex-row gap-1 items-center bg-gray-200 p-3 rounded-lg">
            <div className="flex flex-col gap-2 justify-evenly p-3">
              <h4 className="text-md lg:text-xl xl:text-2xl font-semibold">
                Find your perfect home, stress-free.
              </h4>
              <p className="text-slate-700 text-xs lg:text-lg">
                We have witnessed ever evolving landscapes of the real estate
                market and a trusted partner by hundred of clients
              </p>
              <Link
                to="/search"
                className="flex items-center gap-1 font-semibold hover:text-red-600 text-xs lg:text-lg"
              >
                Discover the perfect property{' '}
                <FaArrowUpRightFromSquare className="text-sm hover:text-red-600 font-semibold" />
              </Link>
            </div>
            <img
              src="/heroImg.jpg"
              alt="Image"
              className="h-40 w-36 lg:h-64 lg:w-56 xl:h-72 xl:w-60 bg-contain bg-center bg-no-repeat rounded-t-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
