import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center mx-auto p-7">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          className="rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          className="rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-red-600 hover:bg-red-900 p-3 rounded-lg border-none text-slate-50 uppercase"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">Error occured: {error}</p>}
    </div>
  );
}
