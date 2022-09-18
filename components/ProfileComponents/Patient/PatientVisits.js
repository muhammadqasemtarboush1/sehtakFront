import React, { useState ,useEffect } from 'react'

import axios from 'axios';
import jwt_decode from "jwt-decode";

import "nprogress/nprogress.css";
import NProgress  from 'nprogress';

export default function PatientVisits() {
    

    const api = 'https://sehtak.herokuapp.com/api/v1/visits/'; 
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
        <div>
            profile
            {patientData?.id}
            {patientData?.doctor?.name}
            {patientData?.lab?.name}
            {patientData?.medicine}
            {patientData?.patient}
            {patientData?.pharmacist?.name}
            {patientData?.prescription}
            {patientData?.summary}
            {patientData?.visit_status}
            {patientData?.x_rays_lab?.name}
            {patientData?.description}
            {patientData?.x_rays}
        </div>
    </>

  )
}


