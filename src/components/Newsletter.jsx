import { useState } from 'react';
import { URL } from '../redux/store';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await fetch(`${URL}/api/newsletter/post`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success === false) {
        setSuccess(false);
        return;
      }
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  };
  const handleChange = e => {
    setEmail(e.target.value);
  };
  return (
    <div className="bg-gray-100 p-10 mx-auto max-w-6xl">
      {!success && (
        <>
          <h2 className="text-2xl sm:text-3xl text-slate-800 font-bold text-center capitalize mb-8">
            Or subscribe to our newsletter
          </h2>
          <form
            onSubmit={handleSubmit}
            name="newsletter"
            className="flex gap-4 mx-auto text-center items-baseline"
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address..."
              onChange={handleChange}
              value={email}
              className="h-8 bg-transparent outline-none border-b-2 pl-2 border-black md:w-2/3 w-full mb-5 placeholder:text-black/50 mr-4"
            />
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 text-white 
          rounded-lg border p-3 md:w-1/3"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {success && (
        <h2 className="text-2xl sm:text-3xl text-center capitalize text-slate-800 font-bold">
          Thank you for subscribing to our newsletter
        </h2>
      )}
    </div>
  );
}
