import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCart from '../components/ListingCart';

export default function Search() {
  const navigate = useNavigate();
  const [sideBarData, setSideBarData] = useState({
    searchTerm: '',
    type: 'all',
    offers: false,
    parking: false,
    furnished: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get('searchTerm');
    const typeFromURL = urlParams.get('type');
    const offersFromURL = urlParams.get('offers');
    const parkingFromURL = urlParams.get('parking');
    const furnishedFromURL = urlParams.get('furnished');
    const sortFromURL = urlParams.get('sort');
    const orderFromURL = urlParams.get('order');

    if (
      searchTermFromURL ||
      typeFromURL ||
      offersFromURL ||
      parkingFromURL ||
      furnishedFromURL ||
      sortFromURL ||
      orderFromURL
    ) {
      setSideBarData({
        searchTerm: searchTermFromURL || '',
        type: typeFromURL || 'all',
        offers: offersFromURL === 'true' ? true : false,
        parking: parkingFromURL === 'true' ? true : false,
        furnished: furnishedFromURL === 'true' ? true : false,
        sort: sortFromURL || 'created_at',
        order: orderFromURL || 'desc',
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/getall?${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          return;
        }
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {}
    };

    fetchListings();
  }, [location.search]);

  const handleChange = e => {
    if (e.target.name === 'searchTerm') {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }

    if (
      e.target.name === 'all' ||
      e.target.name === 'rent' ||
      e.target.name === 'sale'
    ) {
      setSideBarData({
        ...sideBarData,
        type: e.target.name,
      });
    }

    if (
      e.target.name === 'offers' ||
      e.target.name === 'parking' ||
      e.target.name === 'furnished'
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.name]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.name === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';

      setSideBarData({ ...sideBarData, sort, order });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('type', sideBarData.type);
    urlParams.set('parking', sideBarData.parking);
    urlParams.set('furnished', sideBarData.furnished);
    urlParams.set('offers', sideBarData.offers);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('order', sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const noOfListings = listings.length;
    const startIndex = noOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getall?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 sm:border-b-0 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              name="searchTerm"
              className="border rounded-lg p-3 w-full"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === 'all'}
              />
              <span>Rent and Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offers"
                id="offers"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.offers}
              />
              <span>Offers</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Parking</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              name="sort_order"
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={'created_at_desc'}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="border rounded-lg p-3 uppercase text-center bg-slate-700 text-slate-100 hover:bg-slate-800">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-6 ">
          {!loading && listings.length === 0 && (
            <p className="p-3 text-slate-700 font-semibold">
              No Listing Found!!
            </p>
          )}
          {loading && (
            <p className="text-center text-xl font-semibold py-3 w-full ">
              Loading...
            </p>
          )}

          {listings &&
            listings.length > 0 &&
            listings.map(listing => (
              <ListingCart key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-red-600 text-center w-full hover:text-red-400"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
