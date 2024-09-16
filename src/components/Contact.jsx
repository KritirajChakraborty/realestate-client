import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../redux/store';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandLord = async () => {
      const res = await fetch(`${URL}/api/user/${listing.userRef}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setLandlord(data);
    };
    fetchLandLord();
  }, [listing]);

  const handleChange = e => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p>
            Contact{' '}
            <span className="font-semibold text-red-700 uppercase">
              {landlord.username}
            </span>{' '}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={handleChange}
            placeholder="Enter your message here..."
            rows={2}
            className="w-full border rounded-lg p-3"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
            className="w-full bg-slate-700 text-slate-100 p-3 rounded-lg border text-center uppercase hover:bg-slate-600"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
