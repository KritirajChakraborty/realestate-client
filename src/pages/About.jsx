import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container p-5">
      <h1 className="text-3xl font-bold text-center my-4">
        About RealEstatePRO
      </h1>
      <p className="text-lg leading-7 text-gray-700 my-6">
        Welcome to <strong>RealEstatePRO</strong>, your go-to platform for
        finding your dream home or the perfect investment property. At
        RealEstate, we aim to simplify the property booking process by
        connecting buyers, sellers, and agents all in one seamless experience.
        Whether you're looking to rent a cozy apartment or purchase a luxury
        villa, RealEstate offers a vast range of property listings tailored to
        suit your needs.
      </p>
      <p className="text-lg leading-7 text-gray-700 my-6">
        Our mission is to make real estate transactions as smooth as possible by
        providing reliable tools for searching, booking, and managing properties
        online. With features like advanced filtering, virtual tours, and secure
        booking options, we help you make informed decisions from the comfort of
        your home.
      </p>
      <h2 className="text-2xl font-semibold text-center my-4">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside leading-7 text-gray-700 my-4">
        <li>
          Extensive listings: From rentals to sales, find thousands of verified
          properties across different cities.
        </li>
        <li>
          Easy bookings: Make appointments, book viewings, and even finalize
          your property online, hassle-free.
        </li>
        <li>
          User-friendly interface: Our platform is designed for ease of use,
          providing a seamless experience whether you're on desktop or mobile.
        </li>
        <li>
          Secure transactions: We prioritize your privacy and security at every
          step of the process.
        </li>
      </ul>
      <p className="text-lg leading-7 text-gray-700 my-6">
        Join thousands of happy homeowners and investors who have found their
        perfect property on RealEstate. Start your journey today!
      </p>
      <div className="text-center mt-8">
        <Link to="/search">
          <button className="bg-slate-700 text-white px-5 py-3 rounded-lg hover:bg-slate-800">
            Start Searching
          </button>
        </Link>
      </div>
    </div>
  );
}
