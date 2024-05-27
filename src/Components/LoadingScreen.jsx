import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const letters = ["L", "O", "A", "D", "I", "N", "G"];
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (index + 1) % letters.length; // Cyclic increment
      setIndex(nextIndex);
    }, 400); // Adjust interval for desired speed

    return () => clearInterval(intervalId);
  }, [index, letters.length]);



  const currentLetter = letters[index];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 z-50 flex flex-col justify-center items-center">
      <div className={`rounded-full border-[12px]  ${index>0 ?" border-l-red-500" :"border-l-red-300" } 
       ${index>1 ?" border-t-blue-500" :"border-t-blue-300" }
       ${index>2 ?" border-r-yellow-500" :"border-r-yellow-300" }
       ${index>3 ?" border-b-green-500 " :"border-b-green-300 " }
          w-[160px] h-[160px]`}>
        <div className="flex justify-center items-center text-[24px] h-full font-medium text-gray-800">
          <span >{currentLetter}</span>
        </div>
      </div>
      <div className="mt-4  font-medium text-gray-800">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
