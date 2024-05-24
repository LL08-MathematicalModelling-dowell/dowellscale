const buttons=[0,1,2,3,4,5,6,7,8,9,10]
export default function Evaluate(){

    function handleButtonClick(index){
          window.location.href=`https://100035.pythonanywhere.com/addons/create-response/v3/?user=True&scale_type=nps&channel=channel_1&instance=instance_1&workspace_id=653637a4950d738c6249aa9a&username=CustomerSupport&scale_id=66507d222b2f1ec67e2569a2&item=${index}`
    }

    return(
        <div className="w-[90%] flex flex-col justify-center items-center gap-4">
         <img src='https://i0.wp.com/dowellresearch.de/wp-content/uploads/2023/04/true-moments-logo-1-1-442919954-1538479590775-1.webp?w=382&ssl=1' alt='dowelllogo'
         className="mt-2 " />
         <div className="xl:w-[70%] lg:w-[80%] w-[100%] bg-[#c5e8c2] p-5 mt-5 flex flex-col justify-center items-center gap-5">
            <img src="https://cdn.discordapp.com/attachments/1232601880878776320/1243523195609288734/image.png?ex=6651c8b9&is=66507739&hm=fe526275a0ccbd40ea60f31c2c8a71259cba621ab5ad1390c3338dbdbc11ce7d&" alt="class image"/>
           <p className="text-[18px] font-bold">HOW WOULD YOU EVALUATE TODAY'S LEARNING ?</p>
           <div className="flex justify-between items-center  bg-white p-2 md:p-3 lg:px-8 border-2 border-[#bfbfbf] w-[100%]">
                {buttons.map((score, index)=>(
                    <button
                    key={index}
                    onClick={()=>{handleButtonClick(index)}}
                    className=" text-[12px] sm:text-[16px] font-bold py-[2px] px-[6px] sm:p-2  sm:px-3 rounded  md:px-4 bg-[#0097b2] text-white "   
                    >
                    {score}

                    </button>
               ))}
                </div>
         </div>
         <p className="text-[14px]">www.dowellresearch.sg</p>
        </div>
    )
}
