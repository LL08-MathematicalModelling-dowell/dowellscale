import { useEffect, useState } from "react";
import { ImArrowDown } from "react-icons/im";
import educationImage from "../assets/images/education.png";
import studyImage from "../assets/images/study.png";
import brainImage from "../assets/images/brain.png";
import discussionImage from "../assets/images/discussion.png";
import developmentImage from "../assets/images/development.png";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";


const questions = [
    "Did you attend the classes regularly?",
    "Do you feel you need more reading or explanation on the topic?",
    "Did you understand the topic well?",
    "Did you feel confident explaining the topic to your friends/classmates?",
    "Can you apply what you understood in real life or role plays?",
];
const buttons = ["😞 No", "😔 May be", "😀 Yes"];
const images=[educationImage,studyImage,brainImage,discussionImage,developmentImage]


export default function DowellScaleForCollege() {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const[disabled,setDisabled]=useState([false, false, false, false, false]);


    const handleButtonClick = async(index) => {
  
        let newClicked = [...clicked];
        newClicked[index] = true;
        setClicked(newClicked);  
  
     let arr = disabled.map((_, i) => i === index ? false : true);
     setDisabled(arr);
      
             const response=await axios.get(`https://100035.pythonanywhere.com/addons/create-response/v3/?user=False&scale_type=likert&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6655659e81047b0bb9ed56e2&item=${index+1}`)
         
              
    };

    const handleSubmission = async (index, i) => {
           window.location.href=`https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_${index + 1}&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66506bd4134317e89f2e207b&item=${i}`;
    
    }
      
      


       

    
      

    return (
        <div className="relative">
       
            <>
              <div className="w-full flex flex-col justify-center items-center text-[18px] font-bold text-red-500 p-2 mt-3">
                <p className="mt-5">MVJ College Of Engineering</p>
                <p>Bengaluru</p>
            </div>
            <p className="text-lg text-black flex justify-center items-center my-5 font-bold">Which stage are you in?</p>
            <div className="flex flex-col justify-center items-center  mt-3 gap-6 ml-auto w-[80%] sm:gap-2">
                {questions.map((question, index) => (
                    <div key={index} className="flex flex-col justify-center items-center w-full mb-4 ">
                        <div className="flex justify-start items-center sm:gap-2 lg:gap-8 md:gap-4 gap-1 w-[100%] sm:px-4">
   
                          <img src={images[index]} alt="image" className="lg:w-[100px] sm:w-[70px] w-[30px]"/>

                            <div className="flex flex-col gap-2 min-w-[80px] md:min-w-[150px] lg:min-w-[200px] w-1/4 justify-center items-center">
                            <div className="lg:text-lg font-semibold md:text-[14px] text-[10px]">{question}</div>
                            { index < questions.length - 1 && (
                            <ImArrowDown className="text-[32px] bg-white  text-red-600 mt-4 " />
                        )}
                        </div>
                            <button
                                className={`rounded-full sm:w-[32px] sm:h-[32px] h-[16px] w-[16px] flex items-center justify-center text-white text-lg font-semibold ${
                                    clicked[index]?"bg-green-500" : disabled[index]? "bg-gray-300": 'bg-gray-500'
                                }`}
                                onClick={() => handleButtonClick(index)}
                                disabled={disabled[index]}
                            >
                                {clicked[index] && <span className="p-2">&#10003;</span>}
                            </button>
                            {clicked[index]  && (
                            <div className="flex justify-center items-center gap-2  mt-2">
                                {buttons.map((data,i)=>(
                                     <button key={i} onClick={()=>{
                                        handleSubmission(index,i)
                                       
                                    }}
                                      className="bg-green-500 font-medium border-none relative rounded-full cursor-pointer text-[9px] sm:text-[10px] md:text-[12px] lg:text-[16px] py-[8px] px-[6px] sm:px-[12px] md:p-2 md:px-4">{data} </button>
                                ))}
                             
                            </div>
                        )}
                        </div>
                      
                       
                    </div>
                ))}
            </div>
            
         
            </>
        
          
        </div>
    );
}
