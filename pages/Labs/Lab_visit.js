//Import Components
import styles from '../styles/Visit.module.css'
import Navbar from "../../components/Navbar";
import Image from 'next/image';

// get our fontawesome imports
import { faPhone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Lab_visit() {
    return (
        <>
            <Navbar />
            <div className={styles.vHeader}>
                <div>
                    <h1 className={styles.title}>Visit - Lab View</h1>
                </div>
                <div className={styles.title}>
                    <p> Dr. Zaid Rayyan</p>
                    <p><span><FontAwesomeIcon icon={faPhone} /></span> 0798877654</p>
                </div>
                <div className={styles.title}>
                    <p >Visit ID </p>
                    <p>224 <span><FontAwesomeIcon icon={faCopy} /></span></p>
                </div>
            </div>
            <hr />
            <div className={styles.components}>
                <div className={styles.desc}>
                    <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Description</label>
                    <textarea id="message" rows="9" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder="Please Dr. leave your comments here..." disabled></textarea>
                </div>
                <div className={styles.medicine}>
                    {/* <Image src='/images/treatment_icons.png' alt='' height='200' width='230'/> */}

                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Medicine</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder="Please Dr. leave your comments here..." disabled></textarea>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Dose - Per day</label>
                        <input type="number" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" disabled />
                        <p className={styles.date} >Created Date: 14-9-2022</p>
                    </div>
                    <div>
                        <Image src='/images/treatment_icons.png' alt='' height='200' width='230' />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Tests</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..."></textarea>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Tests Results</label>
                        <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                        <p className={styles.date}>Created Date: 14-9-2022</p>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">X-Rays</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder="Please Dr. leave your comments here..." disabled></textarea>
                        <p className={styles.date}>Created Date: 14-9-2022</p>
                    </div>
                </div>
            </div>
        </>
    )
}