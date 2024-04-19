import { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { PiSealCheck } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import { NpsLiteScaleInterpretation } from '../utils/helper';
// import SubscribeForm from '../Components/Newsletters';
// import SocialLinks from '../Components/SocialLinks';
import FeedbackForm from '../Components/FeedbackForm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function NpsLiteScale() {
  const [scores, setScores] = useState(null);
  const query = useQuery();

  // this may be used later on
  // const scale_type = query.get('scale_type');
  // const workspace_id = query.get('workspace_id');
  const score = query.get('score');

  useEffect(() => {
    if (score) {
      setScores(NpsLiteScaleInterpretation[score]);
    }
  }, [score]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      
      <header className="py-4 text-center flex flex-col items-center justify-center">
        <img src={logo} alt="React Logo" className="w-16 md:w-24 mx-auto mb-2" />
        <div className="mt-2">
          <PiSealCheck className="text-green-500 text-5xl md:text-6xl" />
        </div>
        <h1 className="text-xl md:text-xl font-bold mt-4">Thank you for your response</h1>
      </header>

      <section className="bg-white rounded-lg shadow-md p-2 w-full md:w-3/4 lg:w-1/2 mt-4">
        <FeedbackForm />
      </section>

      <footer className="mt-8 text-center text-gray-600">
        {/* <SocialLinks /> */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:ml-8">
          {/* <SubscribeForm /> */}
        </div>
        <p className="mt-4">&copy; 2024 DoWell Research, All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NpsLiteScale;
