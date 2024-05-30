import classImage from "../../src/assets/images/class.png"

const buttons=[0,1,2,3,4,5,6,7,8,9,10]
export default function Evaluate(){

    function handleButtonClick(index){
          window.location.href=`https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66507d222b2f1ec67e2569a2&item=${index}`
    }

    return(
        <div className="w-full flex flex-col justify-between items-center gap-4 h-screen p-4">
        <img 
          src='https://i0.wp.com/dowellresearch.de/wp-content/uploads/2023/04/true-moments-logo-1-1-442919954-1538479590775-1.webp?w=382&ssl=1' 
          alt='dowelllogo'
          className="lg:w-[380px] md:w-[300px] w-[200px]" 
        />
        <div className="w-full flex flex-col justify-center items-center flex-grow">
          <div className="w-full sm:w-max bg-[#c5e8c2] p-4 flex flex-col justify-center items-center gap-5 py-8 h-full md:px-10">
            <img 
              className="md:w-max w-[230px]" 
              src={classImage} 
              alt="class image"
            />
            <div className="w-full flex flex-col justify-center items-center">
            <p className="text-[12px] sm:text-[14px] md:text-[18px] font-bold text-center mb-4">
              HOW WOULD YOU EVALUATE TODAY'S LEARNING?
            </p>
            <div className="flex justify-center gap-1 sm:gap-2 items-center bg-white p-1 sm:p-2 border-2 border-[#bfbfbf] w-max py-2">
              {buttons.map((score, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className="text-[10px] sm:text-[16px] font-bold py-1 px-[6px] sm:py-2 sm:px-3 rounded bg-[#0097b2] text-white"
                >
                  {score}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
        <p className="text-[12px]">www.dowellresearch.sg</p>
      </div>
      
      
    )
}
