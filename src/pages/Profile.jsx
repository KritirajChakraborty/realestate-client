import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

//FIREBASE STORAGE SETTINGS
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userSuccess, setUserSuccess] = useState(false);
  //console.log(filePercentage);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            propic: downloadURL,
          });
        });
      }
    );
  };
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
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
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold py-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <input
          onChange={(e) => setFile(e.target.files[0])}
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
          ""
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
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-slate-900 hover:text-red-500 cursor-pointer">
          Delete User
        </span>
        <span className="text-slate-900 hover:text-red-500 cursor-pointer">
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {userSuccess && (
        <p className="text-green-600">User successfuly updated</p>
      )}
    </div>
  );
}
