
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';

function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6 mb-4">
      <a href="https://www.facebook.com/livinglabstories" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
      <a href="https://twitter.com/uxlivinglab" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
      <a href="https://www.linkedin.com/showcase/uxlivinglab/?originalSubdomain=uk" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
      <a href="https://www.instagram.com/livinglabstories/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
      <a href="https://www.youtube.com/channel/UC_Ftf9dTQtKHS2N0KD0duwg" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
      <a href="https://www.uxlivinglab.org/" target="_blank" rel="noopener noreferrer">
        <FaLink className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out text-3xl" />
      </a>
    </div>
  );
}

export default SocialLinks;
