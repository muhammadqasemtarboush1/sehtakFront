import React, { useState, useEffect } from 'react'

//Import Components
import styles from '../../styles/Visit.module.css'
import Navbar from "../../components/Navbar";
import Image from 'next/image';

import { useRouter } from 'next/router';
import axios from 'axios';
import jwt_decode from "jwt-decode";

import "nprogress/nprogress.css";
import NProgress  from 'nprogress';

// get our fontawesome imports
import { faPhone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Patient_visit() {
    
    const router = useRouter();
    const {visitId} = router.query
    let token = null

    const api = 'https://sehtak.herokuapp.com/api/v1/visits/'+visitId+"/"; 
    if (typeof window !== 'undefined') {
        token = JSON.parse(localStorage.getItem("AuthTokens")).access
    }
    const [visitData , setVisitData] = useState(null);

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
            setVisitData(res.data)
            NProgress.done()
        })
        .catch((error) => {
            console.error(error)
            console.log(222222)
            NProgress.done()
        })
       
    }
    
    getProfileInfo()

   }, []);

// {visitData.doctor.name}
// {visitData.doctor.phone}
// {visitData.id}
// {visitData.description}
// {visitData.medicine}

// {visitData.test}
// {visitData.x_rays}


    return (
        <>
        <Navbar />
         {   !visitData ? 
            <div className='mt-5 ml-20' role="status">
            <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
            </div> : 
            <> 
            <div className={styles.vHeader}>
                <div>
                    <h1 className={styles.title}>Visit - Visit Date</h1>
                </div>
                <div className={styles.title}>
                    <p> Dr. {visitData.doctor.name}</p>
                    <p><span><FontAwesomeIcon icon={faPhone} /></span> {visitData.doctor.phone}</p>
                </div>
                <div className={styles.title}>
                    <p >Visit ID </p>
                    <p>{visitData.id} <span><FontAwesomeIcon icon={faCopy} /></span></p>
                </div>
            </div>
            <hr />
            <div className={styles.components}>
                <div className={styles.desc}>
                    <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400 " >Description</label>
                    <textarea id="message" rows="9" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." value={visitData.description}></textarea>
                </div>
                <div className={styles.medicine}>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Medicine</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Please Dr. leave your comments here..." value={visitData.medicine}></textarea>
                    </div>
                    <div>
                        
                        <label for="green-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" id="green-toggle" class="sr-only peer"/>
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sold to Patient</span>
                        </label>
                    </div>
                    <div>
                        <Image src='/images/treatment_icons.png' alt='' height='200' width='230' />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Tests</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." value={visitData.test}></textarea>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Tests Results</label>
                        <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">X-Rays</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..." value={visitData.x_rays}></textarea>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Xray Results</label>
                        <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                    </div>
                </div>
            </div>
            </>
            }
        </>
    )
}