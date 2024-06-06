import logo from "../../src/assets/images/dowellLogo.png"
import Map from "../../src/assets/images/map.png"
import QR from "../../src/assets/images/RegisQr.png"
import { useState } from "react"
import axios from "axios"
export default function RegistrationPage(){
    const[shopNumber,setShopNumber]=useState("")
    const[shopName,setShopName]=useState("")
    const[shopEmail,setShopEmail]=useState("")
    const[err,setErr]=useState({
      numErr:false,
      nameErr:false,
      emailErr:false
    })
    const[success,setSuccess]=useState(0)
   
    async function handleClick(){
      let error=false
      if(shopNumber === '' || isNaN(shopNumber)){
        setErr((prev)=>({
          ...prev,numErr:true
        }))
       error=true
      }
       if(shopName.length==0){
        setErr((prev)=>({
          ...prev,nameErr:true
        }))
        error=true
      }
       if(shopEmail.length==0 || !shopEmail.endsWith("@gmail.com")){
        setErr((prev)=>({
          ...prev,emailErr:true
        }))
        error=true
      }
      if(error){
        return
      }
      else{
      const body={
        toname: shopName,
        toemail:shopEmail,
        subject: "Registration successful for Living Lab Scales",
        email_content: `
                  <p style="font-family:Arial, sans-serif; font-size:14px;">Dear Exhibitor,</p>

                  <p style="font-family:Arial, sans-serif; font-size:14px;">Your registration for the Living Lab Scales Feedback has been successfully completed.</p>

                  <p style="font-family:Arial, sans-serif; font-size:14px;">Please click on the link below to get the customer feedback report:</p>

                  <p>Feedback report link: https://uxlive.me/?scale_id=66616df20f116021b739bcdd&channel=channel_1&instance=instance_${shopNumber} </p>

                  <p style="font-family:Arial, sans-serif; font-size:14px;">Best Regards,</p>

                  <p style="font-family:Arial, sans-serif; font-size:14px;">DoWell UX Living Lab</p>
                                                                                               `
     
      }
        const response=await axios.post("https://100085.pythonanywhere.com/api/email/",body,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        if(response.data.success==true)
          setSuccess(1)
        else
        setSuccess(-1)
      
      }
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
            setErr((prev)=>({
              ...prev,numErr:false
            }))
            setSuccess(0)
          }
        }}
        disabled={success==1}
          className={`border rounded-full p-2 px-6 sm:text-base text-sm ${success==1 ? "bg-gray-300" : ""}`}/>
          {err.numErr && <p className="text-red-500 text-[12px] sm:text-[14px]">**Number should not be empty**</p>}
          <div className="grid sm:flex justify-center items-center sm:gap-8 gap-2 m-4">
            <div className="flex flex-col gap-2"> 
            <label htmlFor="name" className=" self-center text-[14px] sm:text-[16px] font-medium">Name of Stand/Shop in charge</label>
          <input id="name" name="name" value={shopName} type="text"
            placeholder="enter shop/stand name" onChange={(e)=>{
              setShopName(e.target.value)
              setErr((prev)=>({
                ...prev,nameErr:false
              }))
              setSuccess(0)
            }}
            disabled={success==1}
            className={`border rounded-full p-2 px-6 sm:text-base text-sm ${success==1 ? "bg-gray-300" : ""}`}/>
           {err.nameErr && <p className="text-red-500 text-[12px] sm:text-[14px]">**Name should not be empty**</p>}
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="email" className=" self-center text-[14px] sm:text-[16px] font-medium">Email to share report link</label>
          <input id="email" name="email" value={shopEmail} type="email"
            placeholder="enter shop/stand email" onChange={(e)=>{
              setShopEmail(e.target.value)
              setErr((prev)=>({
                ...prev,emailErr:false
              }))
              setSuccess(0)
            }}
            disabled={success==1}
            className={`border rounded-full p-2 px-6 sm:text-base text-sm ${success==1 ? "bg-gray-300" : ""}`}/>
           {err.emailErr && <p className="text-red-500 text-[12px] sm:text-[14px]">**Email is not valid**</p>}
                </div>
          </div>
          <img src={Map} alt="map" className="w-[300px] sm:w-[500px]"/>
          <div className=" w-full">
          <p className="w-full flex justify-center items-center">My location</p>
         
            <div className=" flex justify-center items-center sm:gap-3 gap-1 mt-1">
         
         {success==1 ? (
         <>
          <p className="text-green-600 text-[12px] sm:text-[14px]">Registration successful </p>
         </>
        ):(
        <>
        {success==-1 ? (
        <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-red-600 text-[12px] sm:text-[14px]">Registration failed</p>
         <button className="text-[16px] sm:text-[22px] bg-green-400 sm:px-20 px-8 p-2 rounded-full font-medium
           hover:bg-green-700" 
          onClick={handleClick}>Register</button>
        </div>
      ):(
        <button className="text-[16px] sm:text-[22px] bg-green-400 sm:px-20 px-8 p-2 rounded-full font-medium
        hover:bg-green-700" 
       onClick={handleClick}>Register</button>
    )}
        </>
      )}
          <img src={QR} alt="QR" className="w-[100px]"/>
          </div>
         
          </div>
          
        </div>
    )
}