import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { FaCheck, FaTimes } from 'react-icons/fa';

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubscribe = () => {
    setLoading(true);
    axios
      .post(`https://100085.pythonanywhere.com/uxlivinglab/newsletter/v1/1b834e07-c68b-4bf6-96dd-ab7cdc62f07f/?type=subscribe`, {
        "topic": "scalefeedbackresponse",
        "subscriberEmail": email,
        "typeOfSubscriber": "Prospective Client"
      })
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:ml-8 space-x-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
      />
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Subscribe'}
      </button>
      {success === true && <FaCheck className="text-green-500" />}
      {success === false && <FaTimes className="text-red-500" />}
    </div>
  );
}

export default SubscribeForm;
