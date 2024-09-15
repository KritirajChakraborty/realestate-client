import { Link } from 'react-router-dom';
import { FaAddressBook, FaFacebookF, FaPhone } from 'react-icons/fa6';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = 917002142964;

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      <footer className="bg-slate-200 shadow-md ">
        <div className="mx-auto p-4 flex flex-col md:flex-row text-center items-center justify-between gap-6 max-w-6xl">
          <div className="md:w-[400px] text-center">
            <p className="my-8 text-slate-800">
              At RealEstatePRO, we are dedicated to delivering seamless real
              estate solutions with a focus on quality, trust, innovation, and
              unparalleled customer satisfaction.
            </p>
            <div className="flex justify-center gap-6">
              <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-red-600" />
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-red-600" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-red-600" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-red-600" />
            </div>
          </div>

          <div className="text-slate-700">
            <h4 className="font-semibold mb-3 uppercase">Contact info</h4>
            <div className="flex flex-col justify-between items-center space-y-2">
              <button
                onClick={handleCallClick}
                className="text-sm flex gap-1 items-center hover:text-red-600 border-none"
              >
                <FaPhone /> +{phoneNumber}
              </button>
              <Link to={`mailto:kritirajchakraborty@gmail.com`}>
                <button className="text-sm flex gap-1 items-center hover:text-red-600 border-none">
                  <MdAttachEmail className="text-md" />
                  kritirajchakraborty@gmail.com
                </button>
              </Link>
              <button className="text-sm flex gap-1 items-center hover:text-red-600 border-none">
                <FaAddressBook /> Bangalore, Karnataka
              </button>
            </div>
          </div>

          <div className="text-slate-700">
            <h4 className="font-semibold mb-3">ABOUT US</h4>
            <div className="space-y-2">
              <Link to="/search" className="text-sm block hover:text-red-600">
                Our Properties
              </Link>
              <Link to="/faq" className="text-sm block hover:text-red-600">
                FAQ
              </Link>
              <Link to="/tnc" className="text-sm block hover:text-red-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-slate-800">
          <p className="text-slate-50 text-center items-center py-3">
            © {currentYear} RealEstatePRO, Inc.
          </p>
        </div>
      </footer>
    </>
  );
}
