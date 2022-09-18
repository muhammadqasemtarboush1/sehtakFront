import React, { useState } from 'react'
import Image from 'next/image'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import jwt_decode from "jwt-decode";

import { useRouter } from 'next/router';
import "nprogress/nprogress.css";
import NProgress  from 'nprogress';

export default function UserData() {
  
  // const EditUserInfo = "https://sehtak.herokuapp.com/auth/profile/";

  
  const [startDate, setStartDate] = useState(new Date());
  const divStyle = "grid grid-rows-2 mb-5"
  const lableStyle = "font-sans text-lg text-white"
  const inputStyle = "rounded-lg w-52"
  const router = useRouter();
  
  
  const editUserUrl ="https://sehtak.herokuapp.com/auth/profile/"
  
  async function editProfileInfo(userInput) {
    NProgress.start()
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
  };
  console.log(JSON.parse(localStorage.getItem("AuthTokens")).access)
    let accessData = null
    if (typeof window !== 'undefined') {
      accessData = JSON.parse(localStorage.getItem("AuthTokens")).access
      accessData = jwt_decode(accessData).info_id
    }
    console.log(editUserUrl + accessData)
    try {
        const res = await axios.put(editUserUrl + accessData+"/", userInput,config);
        
        if (res.status === 400) {
            console.log(`${res.status} bad request`)
            NProgress.done()
        }
        if (res.status === 201 || res.status === 200) {
          router.push('vistisInfo');
        }
    }
    catch (error) {
        console.log(` Error Signing in: ${error}`)
        NProgress.done()
    }
  }

  async function handleEditSubmit(e){
    e.preventDefault()
    let dataInfo ={

      "first_name": e.target.firstName.value,
      "last_name": e.target.lastName.value,
      "phone": e.target.phone.value,
      "birth_date": null,
      "gender": e.target.gender.value,
      "height": e.target.hight.value,
      "weight": e.target.weight.value,
      "blood_type": e.target.blood_type.value,
      "allergies": e.target.allergies.value
    }
    
    await editProfileInfo(dataInfo)
  }

  
  return (
    <>
    
    <div className='h-screen backGroundCoverImage'>
      <div className='flex h-20 py-3 pl-12 bg-gradient-to-r from-teal-100 to-teal-50'> 
          <Image src="/images/logo.png" width={140} height={30} className='ml-3'/> 
      </div>
      <div className='ml-5 text-4xl text-green-600'>Information Edit</div>
        <form onSubmit={handleEditSubmit}>
          <div className='flex flex-wrap justify-around max-w-3xl p-5 ml-5 bg-teal-300 rounded-md'>
            <div className=''>

              <div className={divStyle}>
                <label className={lableStyle} for="firstName">First Name</label>
                <input className={inputStyle} name='firstName'/>
              </div>

              <div className={divStyle}>  
                <label className={lableStyle} for="lastName">Last Name</label>
                <input className={inputStyle} name='lastName' id='lastName'/>
              </div>
              
              <div className={divStyle + lableStyle}> Gender
                <input  id="female" type="radio" value="1" name="gender"/>
                <label for="female">Female</label>
                <input  id="male" type="radio" value="0" name="gender"/>
                <label for="male">Male</label>
              </div>
              
              
              <div>
                
                <div className={divStyle}>
                  <label className={lableStyle} for="hight">Height <span>in cm</span></label>
                  <input  className={inputStyle} name='hight' id='hight'/>
                </div>

                <div className={divStyle}>
                  <label className={lableStyle} for="weight">Weight <span>in kg</span></label>
                  <input className={inputStyle} name='weight' id='weight'/>
                </div>
                
              </div>
              
              <div>
                <label for="countries" className="">Select an option</label>
                <select id="countries" name='blood_type' className="">
                  <option selected>Choose a Blood Type</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
            </div>

            
            <div className=''>
              
              <div className={divStyle}>
                <label className={lableStyle} for="phone">Phone Number</label>
                <input className={inputStyle} name='phone'/>
              </div>
              
              <div className={divStyle}>
                <label className="h-5 font-sans text-lg text-white align-bottom" for="datepicker">Birth Date</label>
                <div><DatePicker className={inputStyle} id='datepicker' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
              </div>
              
              <div className={divStyle}>
                <label className={lableStyle}  for="allergies" >Allergies</label>
                <input className={inputStyle} type="text" id='allergies' name='allergies' />
              </div>

              <div>
                <input className='bg-sky-600' type="submit" value='Create Account' />
              </div>
            </div>
            
          </div>
        </form>
    </div>
    </>
    
  )
}
