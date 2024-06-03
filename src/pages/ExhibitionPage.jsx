import dowellLogo from "../assets/images/dowell.png"
import npsScale from "../assets/images/nps-scale.png"
import QR from "../assets/images/QR.png"
import NpsLiteScale from "./NpsLiteScale"
export default function ExhibitionPage(){
    const buttons=[0,1,2,3,4,5,6,7,8,9,10]

    function click(index){
            console.log(index)
    }
    return(
        <div className="h-screen w-screen bg-[#efecec] p-2 relative">
          
            <div className="w-full flex flex-col justify-end items-end  p-2 ">
                <img className="w-[80px] md:w-[120px] " src={dowellLogo} alt="dowell logo"/>
                <p className="text-[12px] md:text-[18px]">DoWell Research</p>
            </div>
            <div  className="flex flex-col justify-center items-center p-2 mt-10 sm:mt-0 gap-3 sm:gap-[1px]">
                <img src={npsScale} alt="nps-scale" className="w-[350px] sm:w-[450px]"/>
                <p className="font-bold text-red-500 sm:text-[30px] text-[18px]">How do you like this exhibition?</p>
                <p className="sm:text-[18px] text-[14px]">Tell us what you think using the scale below!</p>
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-3 m-7 sm:m-5">
                {buttons.map((button,index)=>(
                    <button key={index}
                    className="bg-[#ffa3a3] sm:px-4 sm:p-2 p-[2px] px-[8px] rounded-full font-bold text-[14px] md:text-[20px]"
                    onClick={()=>{click(index)}}>{button}</button>
                ))}
            </div>
            <div className=" absolute bottom-5 right-[37%] sm:right-[45%] flex flex-col ">
                <img src={QR} alt="qr code" className="w-[80px] "/>
                
            </div>
            <p className="absolute bottom-0  right-[25%] sm:right-[42%] text-[14px]">Powered by uxlivinglab</p>
          
        </div>
    )
}