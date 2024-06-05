import logo from "../../src/assets/images/dowellLogo.png"
import Map from "../../src/assets/images/map.png"
import QR from "../../src/assets/images/RegisQr.png"
import { useState } from "react"

export default function RegistrationPage(){
    const[shopNumber,setShopNumber]=useState("")
    const[shopName,setShopName]=useState("")
    const[shopEmail,setShopEmail]=useState("")

    function handleClick(){
        console.log(shopEmail,shopName,shopNumber)
    }
    return(
        <div className="flex flex-col justify-center items-center relative">
          <img src={logo} alt="dowell logo" className=""/>
          <p className="mt-1 text-[24px] sm:text-[32px] font-bold">Voice of Customers</p>
          <p className="mt-1 text-[18px] sm:text-[24px] font-bold text-orange-600">Register Stand/Shop</p>
          <label htmlFor="number" className="m-2 text-[14px] sm:text-[16px] font-medium">Stand/Shop Number</label>
          <input id="number" name="number" value={shopNumber}
          placeholder="enter shop/stand number"  onChange={(e) => {
          const value = e.target.value;
          if (value === '' || !isNaN(value)) {
            setShopNumber(value);
          }
        }}
          className="border rounded-full p-2 px-6 sm:text-base text-sm "/>
          <div className="grid sm:flex justify-center items-center sm:gap-8 gap-2 m-4">
            <div className="flex flex-col gap-2"> 
            <label htmlFor="name" className=" self-center text-[14px] sm:text-[16px] font-medium">Name of Stand/Shop in charge</label>
          <input id="name" name="name" value={shopName} type="text"
            placeholder="enter shop/stand name" onChange={(e)=>setShopName(e.target.value)}
           className="border rounded-full p-2 sm:px-10 px-6 sm:text-base text-sm"/>
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="email" className=" self-center text-[14px] sm:text-[16px] font-medium">Email to share report link</label>
          <input id="email" name="email" value={shopEmail} type="email"
            placeholder="enter shop/stand email" onChange={(e)=>setShopEmail(e.target.value)}
           className="border rounded-full p-2 sm:px-10 px-6 sm:text-base text-sm"/>
                </div>
          </div>
          <img src={Map} alt="map" className="w-[300px] sm:w-[500px]"/>
          <div className=" w-full">
          <p className="w-full flex justify-center items-center">My location</p>
         
            <div className=" flex justify-center items-center sm:gap-3 gap-1 mt-1">
          <button className="text-[16px] sm:text-[22px] bg-green-400 sm:px-20 px-8 p-2 rounded-full font-medium" 
          onClick={handleClick}>Register</button>
          <img src={QR} alt="QR" className="w-[100px]"/>
          </div>
         
          </div>
          
        </div>
    )
}