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
       await axios.get(api, {
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
    {
    !patientData ? 
    <div className='mt-5 ml-20' role="status">
    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
    </div>

    :
        <div>
            
            <div>
            

            <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Doctor Name
                </th>
                <th scope="col" className="px-6 py-3">
                Specialty
                </th>
                <th scope="col" className="px-6 py-3">
                Location
                </th>
                <th scope="col" className="px-6 py-3">
                Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                Visit Date
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
            </tr>
        </thead>
        <tbody>
        {patientData?.map((visit) => (
                    <tr className="border-b odd:bg-white even:bg-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {visit.doctor?.name}
                    </th>
                    <td className="px-6 py-4">
                    {visit.doctor?.city}
                    </td>
                    <td className="px-6 py-4">
                    {visit.doctor?.name}
                    </td>
                    <td className="px-6 py-4">
                    {visit.doctor?.phone}
                    </td>
                    <td className="px-6 py-4">
                    {visit.doctor?.name}
                    </td>
                    <td className="px-6 py-4">
                    {
                        visit.visit_status == true  ?  <span className='p-2 text-black bg-green-400 rounded-md' >Open</span>:<span className='p-2 text-black bg-gray-400 rounded-md' >Closed</span>
                    }
                       
                        
                    </td>
                </tr>
      ))}


        </tbody>
    </table>
</div>










            </div>
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
         }
    </>

  )
}


