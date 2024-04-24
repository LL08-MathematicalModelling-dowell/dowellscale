import { useState } from 'react';
import { sendEmail } from '../utils/services';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

function FeedbackForm({ scale_type, score, channel, instance, username }) {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'feedback') {
      setFeedback(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (feedback.trim() !== '' && email.trim() !== '') {
        await sendEmail({
          message: feedback,
          email: email,
          scale_name: scale_type,
          score: score,
          channel: channel,
          instance: instance,
          username: username
        });
        setAlertSeverity('success');
        setAlertMessage('Feedback sent successfully!');
        setFeedback('');
        setEmail('');
        setAlertOpen(true);
      } else {
        setAlertSeverity('error');
        setAlertMessage('Please fill in both feedback and email fields before submitting.');
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Failed to send feedback:', error);
      setAlertSeverity('error');
      setAlertMessage('Failed to send feedback. Please try again.');
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTab = () => {
    window.location.href = 'https://www.uxlivinglab.org/';
  };

  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold mb-4">Write feedback to us</h2>
      <textarea
        className="w-full p-3 border rounded-md resize-none focus:border-blue-500 focus:outline-none h-32"
        placeholder="Write here"
        name="feedback"
        value={feedback}
        onChange={handleInputChange}
      ></textarea>
      <input
        type="email"
        className="w-full p-3 mt-4 border rounded-md focus:border-blue-500 focus:outline-none"
        placeholder="Your Email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
      </button>
      <button
        className="mt-4 ml-2 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out"
        onClick={handleCloseTab}
      >
        Close
      </button>
      {alertOpen && (
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          className="mt-4"
        >
          <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </>
  );
}

export default FeedbackForm;
