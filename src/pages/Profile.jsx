import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.js';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../redux/store.js';

//FIREBASE STORAGE SETTINGS
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userSuccess, setUserSuccess] = useState(false);
  const [listings, setListings] = useState([]);
  const [listingError, setListingError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async file => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePercentage(Math.round(progress));
      },
      error => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setFormData({
            ...formData,
            propic: downloadURL,
          });
        });
      }
    );
  };
  const handleChange = async e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${URL}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUserSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(userDeleteStart());
      const res = await fetch(`${URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.status === false) {
        dispatch(userDeleteFailure(data.message));
        return;
      }
      dispatch(userDeleteSuccess());
      navigate('/signup');
    } catch (error) {
      // console.log('Could not delete user:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(userDeleteStart());
      const res = await fetch(`${URL}/api/auth/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userDeleteFailure(data.message));
        return;
      }
      dispatch(userDeleteSuccess());
      navigate('/signin');
    } catch (error) {
      dispatch(userDeleteFailure(error.message));
    }
  };

  const handleListing = async () => {
    try {
      setListingError(false);
      const res = await fetch(`${URL}/api/user/listings/${currentUser._id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        setListingError(true);
        return;
      }
      setListings(data);
    } catch (error) {
      setListingError(true);
    }
  };

  const handleDeleteListing = async listingId => {
    try {
      const res = await fetch(`${URL}/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setListings(prevListings => {
        prevListings.filter(listing => listing._id != listingId);
      });
    } catch (error) {}
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold py-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <input
          onChange={e => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.propic || currentUser.propic}
          alt="profile picture"
          className="w-24 h-24 rounded-full object-cover mt-2 self-center cursor-pointer"
        />
        {fileUploadError ? (
          <span className="text-red-600 text-center">
            Error occured while uploading file(must be less than 2mb)
          </span>
        ) : filePercentage > 0 && filePercentage < 100 ? (
          <span className="text-slate-900 text-center">{`Uploading file: ${filePercentage}%`}</span>
        ) : filePercentage === 100 ? (
          <span className="text-green-600 text-center">
            File sucessfully uploaded
          </span>
        ) : (
          ''
        )}
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder={currentUser.username}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder={currentUser.email}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder={currentUser.password}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-red-500 text-slate-50 text-center p-3 border-none uppercase rounded-lg hover:bg-red-700 "
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className="bg-slate-700 text-slate-50 text-center p-3 border-none uppercase rounded-lg hover:bg-slate-800 "
          to="/createlisting"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-slate-900 hover:text-red-500 cursor-pointer"
        >
          Delete User
        </span>
        <span
          onClick={handleSignOut}
          className="text-slate-900 hover:text-red-500 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {userSuccess && (
        <p className="text-green-600">User successfuly updated</p>
      )}
      <button
        onClick={handleListing}
        className="w-full text-slate-800 text-center hover:text-red-500"
      >
        Show Listings
      </button>
      {listings && listings.length >= 1 && (
        <div className="flex flex-col gap-4 p-3">
          <h1 className="text-2xl text-center font-semibold text-slate-900 my-7">
            Your Listings
          </h1>

          {listings.map(listing => (
            <div
              key={listing._id}
              className="border rounded-lg flex justify-between p-3 gap-4 items-center"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageURLs[0]}
                  alt="listing cover image"
                  className="w-20 h-20 object-contain"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="font-semibold truncate text-slate-700 hover:text-orange-700 flex-1"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase hover:text-red-200 hover:bg-red-700 rounded-md p-1"
                >
                  Delete
                </button>
                <Link to={`/updatelisting/${listing._id}`}>
                  <button className="text-slate-800 uppercase hover:bg-slate-800 hover:text-slate-200 rounded-md p-1 ">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
