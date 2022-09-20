import React, { useState, useEffect } from 'react'

import axios from 'axios';
import jwt_decode from "jwt-decode";

import "nprogress/nprogress.css";
import NProgress from 'nprogress';

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PatientVisits() {


    const api = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/visits/`;
    const token = JSON.parse(localStorage.getItem("AuthTokens")).access
    const id_patient = jwt_decode(token).info_id
    const [patientData, setPatientData] = useState(null);
    const router = useRouter()
    const { visitAdded } = router.query

    const [visible, setvisible] = useState("block")

    function hideSuccess() {
        setvisible("hidden")
    }

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
                    console.log(api + id_patient + "/")
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
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
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
                                                City
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
                                            <Link key={visit.id} href={`/Patients/Patient_visit?visitId=` + visit.id}>
                                                <tr className="border-b odd:bg-white even:bg-gray-200 dark:bg-gray-900 dark:border-gray-700 hover:cursor-pointer">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {visit.doctor?.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {visit.doctor?.city}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {visit.doctor?.phone}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {visit.created_at}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            visit.visit_status == true ? <span className='p-2 text-black bg-green-400 rounded-md' >Opened</span> : <span className='p-2 text-black bg-gray-400 rounded-md' >Closed</span>
                                                        }


                                                    </td>
                                                </tr>

                                            </Link>
                                        ))}


                                    </tbody>
                                </table>
                            </div>










                        </div>
                        {

                            visitAdded == "added" ?
                                <div id="alert-3" class={"flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200 " + visible} role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Info</span>
                                    <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                                        Visit was Added To Your Profile
                                    </div>
                                    <button onClick={hideSuccess} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert-3" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div> : ""
                        }
                    </div>
            }
        </>

    )
}


