import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not signin with google ', error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-gradient-to-r from-red-500 via-green-600 to-blue-600 text-center text-slate-50 p-3 uppercase rounded-lg"
    >
      continue with google
    </button>
  );
}
