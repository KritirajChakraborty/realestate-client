import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2 sm:p-4">
        <h1 className="font-bold text-sm sm:text-xl flex">
          <span className="text-slate-500">RealEstate</span>
          <span className="text-slate-700">PRO</span>
        </h1>
        <form className="flex items-center bg-slate-50 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex items-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 text-sm sm:text-xl hover:text-red-600">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-600 text-sm sm:text-xl hover:underline">
              About
            </li>
          </Link>
          <Link to="/signin">
            <li className=" text-slate-600 text-sm sm:text-xl hover:underline">
              Sign-in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
