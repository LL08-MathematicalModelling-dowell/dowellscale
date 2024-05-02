import { useState, useEffect } from 'react';
import logo from '../assets/response.png';
// import { PiSealCheck } from 'react-icons/pi';
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
  const scale_type = query.get('scale_type');
  // const workspace_id = query.get('workspace_id');
  const score = query.get('score');
  const channel = query.get('channel') || '';
  const instance = query.get('instance') || '';
  const username = query.get('username') || '';

  useEffect(() => {
    if (score) {
      setScores(NpsLiteScaleInterpretation[score]);
    }
  }, [score]);

  const openWebiste = () => {
    window.location.href = 'https://dowellresearch.sg/';
  };

  return (
    <div className="bg-white-100 min-h-screen flex flex-col items-center justify-center">
      
      <header className="py-4 text-center flex flex-col items-center justify-center ">
        <img src={logo} alt="React Logo" className="w-3/4 md:w-[19em] mx-auto mb-2" />
      </header>
    
      <hr className="w-full md:w-1/2 border border-gray-300 mb-4 border-red-500" />

      <section className="w-full md:w-3/4 lg:w-1/2 mt-4">
        <FeedbackForm scale_type={scale_type} score={score} channel={channel} instance={instance} username={username}/>
      </section>

      <footer className="mt-8 text-center text-gray-600">
        {/* <SocialLinks /> */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:justify-center">
         
          {/* <SubscribeForm /> */}
        </div>
        <a className="mt-4 block" onClick={openWebiste} style={{ cursor: 'pointer' }}>www.dowellresearch.sg</a>
      </footer>
    </div>
  );
}

export default NpsLiteScale;
