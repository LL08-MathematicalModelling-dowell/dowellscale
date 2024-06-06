// src/HomePage.js

import React from 'react';


function HomePage() {
  return (
    <div className="container mx-auto text-center py-20">
      <p className="text-lg text-gray-700">frontend running <span className="font-bold">v1.0.0</span></p>
      <div className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Version Control</h1>
      <ul className="list-disc list-inside">
        <li className="text-lg text-gray-700">Version 1.0.0 - Initial release</li>
        {/* <li className="text-lg text-gray-700">Version 1.1.0 - Added feature X</li>
        <li className="text-lg text-gray-700">Version 1.2.0 - Fixed bug Y</li> */}
        {/* Add more versions as needed */}
      </ul>
    </div>
    </div>
  );
}

export default HomePage;
