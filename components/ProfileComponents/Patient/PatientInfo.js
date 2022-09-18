import React, { useState ,useEffect } from 'react'

import axios from 'axios';
import jwt_decode from "jwt-decode";

import "nprogress/nprogress.css";
import NProgress  from 'nprogress';

export default function PatientInfo() {
    const editUserUrl ="https://sehtak.herokuapp.com/profile/"

    const api = 'https://sehtak.herokuapp.com/profile/'; 
    const token = JSON.parse(localStorage.getItem("AuthTokens")).access
    const id_patient = jwt_decode(token).info_id
    
    const [patientData , setPatientData] = useState(null);
 
   useEffect(() => {
async function getProfileInfo() {
     NProgress.start()
       await axios.get(api+id_patient+"/", {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
            setPatientData(res.data)
            NProgress.done()
        })
        .catch((error) => {
            console.error(error)
            console.log(222222)
            console.log(api+id_patient+"/")
            NProgress.done()
        })
       
    }
    
    getProfileInfo()

   }, []);


  return (
    <>   
        <div className='mt-3'>
            <div className='my-4 mb-6'> <span className='text-3xl font-semibold text-blue-700'> {patientData?.first_name} {patientData?.last_name} </span></div>
            <div className='mt-3 ml-5'><span className='text-xl font-medium text-sky-500'> Phone Number:</span> <span className='font-medium text-sky-600'> {patientData?.phone} </span></div>

            <div className='flex mt-3 ml-5'> <div> <span className='font-medium text-l text-sky-500'>Height</span> <span className='font-medium text-sky-600'>{patientData?.height}</span></div> <div className='ml-3'><span className='font-medium text-l text-sky-500'>Weight</span> <span className='font-medium text-sky-600'>{patientData?.weight}</span></div></div> 

            <div className='mt-3 ml-5'><span className='text-xl font-medium text-sky-500'>Blood Type:</span> <span className='font-medium text-l text-sky-500'>{patientData?.blood_type}</span></div>  
            <div className='mt-3 ml-5'><span className='text-xl font-medium text-sky-500'>Birth Date:</span> <span className='font-medium text-l text-sky-500'>{patientData?.birth_date}</span></div>
            <div className='mt-3 ml-5'><span className='text-xl font-medium text-sky-500'>Allergies:</span>  <span className='font-medium text-l text-sky-500'>{patientData?.allergies}</span></div>
            
        </div>
    </>

  )
}
