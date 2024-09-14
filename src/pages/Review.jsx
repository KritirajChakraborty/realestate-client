import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Review() {
  const [review, setReview] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: currentUser.username,
          review,
          photoURL: currentUser.propic,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(false);

      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(true);
    }
  };

  return (
    <div className="bg-gray-100 p-3">
      {loading === true ? (
        <p className="text-xl font-semibold text-center">Loading...</p>
      ) : (
        <>
          {' '}
          <h1 className="text-3xl font-semibold text-center mx-auto p-7">
            Write a review
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-3xl mx-auto"
          >
            <textarea
              type="text"
              name="review"
              placeholder="write a review"
              value={review}
              onChange={e => setReview(e.target.value)}
              rows="10"
              maxLength="100"
              required
              className="w-full border-none rounded-lg p-3  mb-8"
            />
            <button className="text-slate-100 bg-slate-700 hover:bg-slate-800 p-3 w-full border rounded-lg uppercase">
              Submit
            </button>
          </form>{' '}
        </>
      )}

      {error && <p className="text-red-600 text-center text-sm p-3">{error}</p>}
    </div>
  );
}
