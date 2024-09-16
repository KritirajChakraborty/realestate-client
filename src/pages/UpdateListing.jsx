import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../redux/store';

export default function UpdateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
    name: '',
    description: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    type: 'rent',
    furnished: false,
    parking: false,
    offers: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`${URL}/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then(url => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(url),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch(err => {
          setImageUploadError(`Image upload failed! max 2mb allowed: ${err}`);
          setUploading(false);
        });
    } else {
      setImageUploadError('You can upload only 6 images!');
      setUploading(false);
    }
  };

  const storeImage = async file => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getDate() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = index => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i != index),
    });
  };

  const handleChange = e => {
    if (e.target.name === 'rent' || e.target.name === 'sale') {
      setFormData({
        ...formData,
        type: e.target.name,
      });
    }

    if (
      e.target.name === 'furnished' ||
      e.target.name === 'parking' ||
      e.target.name === 'offers'
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    }
    if (
      e.target.name === 'bathrooms' ||
      e.target.name === 'bedrooms' ||
      e.target.name === 'name' ||
      e.target.name === 'description' ||
      e.target.name === 'address' ||
      e.target.name === 'regularPrice' ||
      e.target.name === 'discountPrice'
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formData.imageURLs < 1)
        return setError('You must upoad atleast one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discounted price cannot be more than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`${URL}/api/listing/update/${params.listingId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="border p-3 rounded-lg"
              maxLength="50"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              className="border p-3 rounded-lg"
              minLength="20"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="border p-3 rounded-lg"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offers"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offers}
                />
                <span>Offers</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bedrooms"
                  max="10"
                  min="1"
                  className="border border-gray-300 p-3 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  name="bathrooms"
                  max="10"
                  min="1"
                  className="border border-gray-300 p-3 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Bathrooms</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === 'rent' && (
                    <span className="text-xs">(₹ / month)</span>
                  )}
                </div>
              </div>
              {formData.offers && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>
                    {formData.type === 'rent' && (
                      <span className="text-xs">(₹ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={e => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading || loading}
              onClick={handleImageSubmit}
              className="p-3 text-white border bg-green-700 rounded uppercase hover:bg-green-900 disabled:bg-green-800"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageURLs &&
            formData.imageURLs.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 items-center border"
              >
                <img
                  src={url}
                  alt="image uploaded"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  type="button"
                  className="text-red-500 uppercase hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-800 text-white rounded-lg uppercase hover:bg-slate-600 disabled:bg-slate-500"
          >
            {loading ? 'Updating...' : 'Update listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
