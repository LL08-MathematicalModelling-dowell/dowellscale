import classImage from "../../src/assets/images/class.png"
import axios from "axios"
import { useState } from "react"
const buttons=[0,1,2,3,4,5,6,7,8,9,10]
export default function Evaluate(){
   const[submitted,setSubmitted]=useState(-1)


   
     function handleButtonClick(index){
      setSubmitted(index)
        window.location.href=`https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=learning_index&channel=channel_1&instance=instance_1&workspace_id=6385c0e48eca0fb652c9447b&username=HeenaK&scale_id=66867ea81640f70a85079d73&item=${index}`
   
      }

    return(
        <div className="w-full flex flex-col justify-between items-center gap-4 h-screen sm:p-4">
        <img 
          src='https://i0.wp.com/dowellresearch.de/wp-content/uploads/2023/04/true-moments-logo-1-1-442919954-1538479590775-1.webp?w=382&ssl=1' 
          alt='dowelllogo'
          className=" md:w-[300px] w-[200px] mt-16 sm:mt-6" 
        />
        <div className="w-full flex flex-col justify-center items-center flex-grow ">
          <div className="w-full sm:w-max p-1 flex flex-col  items-center md:py-8 h-[80%] sm:h-full md:px-10 relative">
            <img 
              className=" w-[150px] sm:w-[230px]" 
              src={classImage} 
              alt="class image"
            />
            <div className="w-full flex flex-col justify-center items-center">
            <p className="text-[14px] md:text-[18px] font-bold text-center mb-4 mt-14">
                HOW DO YOU EVALUATE TODAY'S LEARNING?
            </p>
            <div className="flex flex-col">
            <div className="flex justify-center gap-1 sm:gap-3 items-center bg-white p-1 sm:p-2  w-max py-2 mt-2">
            <style>
                        {`
                       @keyframes spin {
                        to {
                          transform: rotate(360deg);
                        }
                      }
                      
                      .loader {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        border-top-color: #fff;
                        animation: spin 1s linear infinite;
                      }
                      
                      
                          
                        `}
                    </style>
              {buttons.map((score, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className="text-[14px] sm:text-[16px] font-bold py-1 px-[7px] sm:py-2 sm:px-4 rounded bg-[#0097b2] text-white"
                >
                  {submitted==index ? <div className="loader"></div> : score}
                </button>
              ))}
              </div>
              <div className="flex items-center mt-2 text-black font-medium w-full pl-2">
  <div className="text-[10px] sm:text-[14px] py-2 sm:py-4 w-[22%] sm:w-[26%] bg-[#FF0000] flex justify-center">
    Reading
  </div>
  <div className="text-[7px] sm:text-[14px] py-[10px] sm:py-4 w-[19%] sm:w-[22%] bg-[#FF7F00] flex justify-center">
    Understanding
  </div>
  <div className="text-[10px] sm:text-[14px] py-2 sm:py-4 w-[28%] sm:w-[32%] bg-[#FFFF00] flex justify-center">
    Explaining
  </div>
  <div className="text-[10px] sm:text-[14px] py-2 sm:py-4 w-[20%] bg-[#7FFF00] flex justify-center">
    Evaluating
  </div>
  <div className="text-[10px] sm:text-[14px] py-2 sm:py-4  w-[18%] bg-[#3ba13b] flex justify-center">
    Applying
  </div>
</div>

            </div>

            <p className="text-[12px] mt-5">www.dowellresearch.sg</p>
            </div>
          
          </div>
         
        </div>
      
      </div>
      
      
    )
}
