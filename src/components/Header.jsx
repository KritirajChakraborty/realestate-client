import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlParamsFromURL = urlParams.get('searchTerm');
    setSearchTerm(urlParamsFromURL === null ? '' : urlParamsFromURL);
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2 sm:p-4">
        <h1 className="font-bold text-sm sm:text-xl flex">
          <span className="text-slate-500">RealEstate</span>
          <span className="text-slate-700">PRO</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-slate-50 p-3 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-slate-600" onClick={handleSubmit} />
        </form>
        <ul className="flex items-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 text-sm sm:text-xl hover:text-red-600">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-600 text-sm sm:text-xl hover:text-red-600">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.propic}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className=" text-slate-600 text-sm sm:text-xl hover:underline">
                Sign-in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
