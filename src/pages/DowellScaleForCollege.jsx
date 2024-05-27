import { useEffect, useState } from "react";
import { ImArrowDown } from "react-icons/im";
import educationImage from "../assets/images/education.png";
import studyImage from "../assets/images/study.png";
import brainImage from "../assets/images/brain.png";
import discussionImage from "../assets/images/discussion.png";
import developmentImage from "../assets/images/development.png";
import axios from "axios";

// const buttonLinks=["https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=0",
// "https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=1",
// "https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps_lite&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=6645f30f1cddfeac941274cb&item=2"]
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
    const [showButton, setShowButton] = useState([false, false, false, false, false]);
    const [answered, setAnswered] = useState([false, false, false, false, false]);
    const[responseCount,setResponseCount]=useState(0)
    const[toggleFeedback,setToggleFeedback]=useState(5)
    const[togglePopup,setTogglePopup]=useState(false)
    const[indexData,setIndexData]=useState(-1)

    
    useEffect(()=>{
        let arr=[false,false,false,false,false]
        let clickArr=[]
        let  showArr=[]
        for(let i=0;i<5;i++){
        //   localStorage.removeItem(`answered[${i}]`)
        //   localStorage.removeItem(`clicked[${i}]`)
        //   localStorage.removeItem(`showButton[${i}]`)
        // localStorage.removeItem(`feedback`)
        let count=0
           arr[i]=localStorage.getItem(`answered[${i}]`) ? true : false
           if(arr[i])
           count++
        setResponseCount(count)
           clickArr[i]=localStorage.getItem(`clicked[${i}]`) ? true : false
           showArr[i]=localStorage.getItem(`showButton[${i}]`) ? true : false
           setToggleFeedback(localStorage.getItem(`feedback`) || 5)
        }
        setAnswered(arr)
        setClicked(clickArr)
        setShowButton(showArr)
      },[])


    const handleButtonClick = async(index) => {
        if(!answered[index]){
        setIndexData(index)
        if(toggleFeedback!=-1 && toggleFeedback!=1){
            setTogglePopup(true)
        
        }else{
            localStorage.setItem(`showButton[${index}]`,index)
            let arr = [...showButton];
            arr[index] = true;
            setShowButton(arr); 
        }
    }
        if(!clicked[index]){
    
        try{
            localStorage.setItem(`clicked[${index}]`,index)
            let newClicked = [...clicked];
            newClicked[index] = true;
            setClicked(newClicked);  
        const response=await axios.get(`https://100035.pythonanywhere.com/addons/create-response/v3/?user=False&scale_type=likert&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66506bd4134317e89f2e207b&item=${index+1}`)
     
       
        }catch(error){
           console.log(error)
        }
       
    }
    };

    const  handleSubmission=async(index,i)=>{
        let type
        if(!answered[index]){
                localStorage.setItem(`answered[${index}]`,i)
                setResponseCount((prev)=>prev+1)
                let newAnswered = [...answered];
                newAnswered[index] = true;
                setAnswered(newAnswered); 
                if(toggleFeedback==1){
                    type="True"
                }else{
                    type="False"
                }
             
                if(type=="False"){
                    const response=await axios.get(`https://100035.pythonanywhere.com/addons/create-response/v3/?user=${type}&scale_type=nps_lite&channel=channel_1&instance=instance_${index+1}
                    &workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66506bd4134317e89f2e207b&item=${i}`) 
                }
              
               else{
                let link=`https://100035.pythonanywhere.com/addons/create-response/v3/?user=${type}&scale_type=nps_lite&channel=channel_1&instance=instance_${index+1}
                &workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66506bd4134317e89f2e207b&item=${i}`
                window.open(link, '_blank', 'width=800,height=600,scrollbars=yes');

              
               }
          
               if(responseCount==4){
             
                for(let i=0;i<5;i++){
                      localStorage.removeItem(`answered[${i}]`)
                      localStorage.removeItem(`clicked[${i}]`)
                      localStorage.removeItem(`showButton[${i}]`)
                    localStorage.removeItem(`feedback`)
               }
            }
               
            
           
    }
}


     async function onCancel(){
      
           setToggleFeedback(-1)
           localStorage.setItem(`feedback`,-1)
           setTogglePopup(false)
           let arr = [...showButton];
           arr[indexData] = true;
           setShowButton(arr); 
           localStorage.setItem(`showButton[${indexData}]`,indexData)
      }

    async function onConfirm(){
        setToggleFeedback(1)
        localStorage.setItem(`feedback`,1)
        setTogglePopup(false)
    
        let arr = [...showButton];
        arr[indexData] = true;
        setShowButton(arr); 
        localStorage.setItem(`showButton[${indexData}]`,indexData)
   
      }

      async function onMaybe(){
       
        localStorage.setItem(`feedback`,2)
        setToggleFeedback(2)
        setTogglePopup(false)
        localStorage.setItem(`showButton[${indexData}]`,indexData)
        let arr = [...showButton];
        arr[indexData] = true;
        setShowButton(arr); 
       
      
      }

    
      const PopUp = ({ onCancel, onConfirm, onMaybe }) => {
        return (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
                style={{ fontFamily: 'Roboto, sans-serif' }}
            >
                <div className="bg-gray-200 rounded-lg p-5 shadow-lg">
                    <p className="text-center text-lg">Do you want to give feedback?</p>
                    <div className="flex gap-4 justify-center items-center mt-4">
                        <button 
                            className="p-2 md:px-8 bg-[#129561] text-white rounded hover:bg-[#0e7b4e]" 
                            onClick={onConfirm}
                        >
                            Yes
                        </button>
                        {toggleFeedback === 5 ? (
                            <button 
                                className="p-2 md:px-8 bg-yellow-400 text-white rounded hover:bg-yellow-500" 
                                onClick={onMaybe}
                            >
                                Maybe later
                            </button>
                        ) : (
                            <button 
                                className="p-2 md:px-8 bg-[#ff4a4a] text-white rounded hover:bg-[#d93b3b]" 
                                onClick={onCancel}
                            >
                                No
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    

    return (
        <div className="relative">
       
            <>
              <div className="w-full flex flex-col justify-center items-center text-[18px] font-bold text-red-500 p-2 mt-3">
                <p className="mt-5">MVJ College Of Engineering</p>
                <p>Bengaluru</p>
            </div>
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
                                    answered[index]?"bg-green-500" :clicked[index] ? 'bg-orange-500' : 'bg-gray-500'
                                }`}
                                onClick={() => handleButtonClick(index)}
                            >
                                {answered[index] && <span className="p-2">&#10003;</span>}
                            </button>
                            {clicked[index] && showButton[index] && (
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
            <div className="hidden md:flex md:flex-col gap-3 justify-center items-start ml-[50%] mb-4 w-max border-2 p-4 border-gray-300 text-[10px] md:text-[14px] absolute top-10 right-10">
                 <p className="flex justify-end items-center gap-2 "><span className="h-[8px] w-[8px] bg-gray-500"></span>Unanswered</p>
                 <p className="flex justify-end items-center gap-2 "><span className="h-[8px] w-[8px] bg-orange-500"></span>Pending</p>
                 <p className="flex justify-end items-center gap-2 "><span className="h-[8px] w-[8px] bg-green-500"></span>Answered</p>
            </div>
            {togglePopup && <PopUp onCancel={onCancel} onConfirm={onConfirm} onMaybe={onMaybe}/>}
            </>
        
          
        </div>
    );
}
