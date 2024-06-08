import logo from "../../src/assets/images/dowellLogo.png"
import Map from  "../../src/assets/images/map.png"
import { useEffect, useState } from "react"
import axios from "axios"
import MapComponent from "./MapComponent"



export default function RegistrationPage(){
    const[shopNumber,setShopNumber]=useState("")
    const[instituteName,setInstituteName]=useState("")
    const[inchargeName,setInchargeName]=useState("")
    const[shopEmail,setShopEmail]=useState("")
    const[err,setErr]=useState({
      numErr:false,
      nameErr:false,
      emailErr:false,
      instituteErr:false
    })
    const[success,setSuccess]=useState(0)
   const[latitude,setLatitude]=useState("")
   const[longitude,setLongitude]=useState("")
   const[locationLoading,setLocationLoading]=useState(0)



   async function handleClick() {
    let error = false;
    const errors = {
      numErr: false,
      nameErr: false,
      emailErr: false,
    };
  
    if (shopNumber === '' || isNaN(shopNumber)) {
      errors.numErr = true;
      error = true;
    }
  
    if (inchargeName.length === 0) {
      errors.nameErr = true;
      error = true;
    }
  
    if (shopEmail.length === 0 || !shopEmail.endsWith("@gmail.com")) {
      errors.emailErr = true;
      error = true;
    }
  
    setErr((prev) => ({ ...prev, ...errors }));
  
    if (error) return;
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const body = {
      shop_number: shopNumber,
      institution_name: instituteName,
      incharge_person: inchargeName,
      email_id: shopEmail,
      shop_lat: latitude,
      shop_long: longitude,
    };
  
    try {
      const response = await axios.post("https://100035.pythonanywhere.com/addons/register/", body, { headers });
  
      if (response.data.success) {
        const bodyEmail = {
          toname: inchargeName,
          toemail: shopEmail,
          subject: "Registration successful for Living Lab Scales",
          email_content: `
            <p style="font-family:Arial, sans-serif; font-size:14px;">Dear Exhibitor,</p>
            <p style="font-family:Arial, sans-serif; font-size:14px;">Your registration for the Living Lab Scales Feedback has been successfully completed.</p>
            <p style="font-family:Arial, sans-serif; font-size:14px;">Please click on the link below to get the customer feedback report:</p>
            <p>Feedback report link: https://www.uxlive.me/dowellscale/shop/report/?scale_id=66616df20f116021b739bcdd&channel=channel_1&instance=instance_${shopNumber}</p>
            <p style="font-family:Arial, sans-serif; font-size:14px;">Best Regards,</p>
            <p style="font-family:Arial, sans-serif; font-size:14px;">DoWell UX Living Lab</p>
          `,
        };
  
        const responseEmail = await axios.post("https://100085.pythonanywhere.com/api/email/", bodyEmail, { headers });
  
        setSuccess(responseEmail.data.success === "true" ? 1 : -1);
      } else {
        setSuccess(-1);
      }
    } catch (error) {
      console.log(error);
      setSuccess(-1);
    }
  }
  

    useEffect(()=>{
     fetchLocation()
    },[])

    async function fetchLocation(){
         const response=await axios.get("https://www.qrcodereviews.uxlivinglab.online/api/v6/qrcode-data/22-d4234c7b-77c1-4ed6-8ea1-9417d9ad63d3/")
         const detailedReport = response.data.response.detailed_report;

    if (Array.isArray(detailedReport) && detailedReport.length > 0) {
     
        
        setLatitude(detailedReport[detailedReport.length - 1].lat)
        setLongitude(detailedReport[detailedReport.length - 1].long)
        setLocationLoading(1)
    } else {
        console.log("detailed_report is either not an array or is empty");
        setLocationLoading(-1)
    }
    }
   

    return(
        <div className="flex flex-col justify-center items-center relative">
          <img src={logo} alt="dowell logo" className=""/>
          <p className="mt-1 text-[24px] sm:text-[32px] font-bold">Voice of Customers</p>
          <p className="mt-1 text-[18px] sm:text-[24px] font-bold text-orange-600">Register Stand/Shop</p>
          <div className="grid sm:flex justify-center items-center sm:gap-8 gap-2 mt-4">
          <div className="flex flex-col gap-2"> 
          <label htmlFor="number" className=" text-[14px] sm:text-[16px] font-medium self-center">Stand/Shop Number</label>
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
          </div>
          {err.numErr && <p className="text-red-500 text-[12px] sm:text-[14px]">**Number should not be empty**</p>}
          <div className="flex flex-col gap-2"> 
          <label htmlFor="institute" className="text-[14px] sm:text-[16px] font-medium self-center">Name of Institute</label>
          <input id="institute" name="institute" value={instituteName} type="text"
          placeholder="enter shop/stand number"  onChange={(e) => {
            setInstituteName(e.target.value);
            setErr((prev)=>({
              ...prev,instituteErr:false
            }))
            setSuccess(0)
          }
        }
        disabled={success==1}
          className={`border rounded-full p-2 px-6 sm:text-base text-sm ${success==1 ? "bg-gray-300" : ""}`}/>
          </div>
          {err.instituteErr && <p className="text-red-500 text-[12px] sm:text-[14px]">**Institute should not be empty**</p>}
          </div>
          <div className="grid sm:flex justify-center items-center sm:gap-8 gap-2 m-4">
            <div className="flex flex-col gap-2"> 
            <label htmlFor="name" className=" self-center text-[14px] sm:text-[16px] font-medium">Name of Stand/Shop in charge</label>
          <input id="name" name="name" value={inchargeName} type="text"
            placeholder="enter shop/stand name" onChange={(e)=>{
              setInchargeName(e.target.value)
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
          <div className="w-[300px] sm:w-[500px] h-[250px]">
            {locationLoading==0 ? (
              <>
              <p className="text-[18px] w-full h-full flex justify-center items-center bg-gray-100">Fetching location details...</p>
            </>
          ):(
          <>
          {locationLoading==1 ? (
            <>
            <MapComponent lat={latitude} lng={longitude}/>
            </>
          ):(
          <>
           <p className="text-[18px] w-full h-full flex justify-center items-center bg-gray-100">Failed to Load Location details</p>
          </>
        )}
          </>
        )}
          
         </div>
        {/* <img src={Map} alt="deowell logo" className="w-[300px] sm:w-[500px]"/> */}
          <div className=" w-full">
          <p className="w-full flex justify-center items-center">My location</p>
         
            <div className=" flex justify-center items-center sm:gap-3 gap-1 mt-1">
         
         {success==1 ? (
         <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-green-600 text-[12px] sm:text-[14px]">Registration successful </p>
          <p className="text-red-600 text-[12px] sm:text-[16px]">Please check your email for report. </p>
         </div>
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
       
          </div>
         
          </div>
        
          
        </div>
    )
}