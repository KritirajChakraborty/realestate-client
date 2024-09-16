import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import { URL } from '../redux/store';
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${URL}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold mx-auto py-7">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-red-500 text-slate-50 text-center hover:bg-red-700 p-3 rounded-lg border-none uppercase "
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/signin" className="text-blue-700 ">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">Error: {error}</p>}
    </div>
  );
}
