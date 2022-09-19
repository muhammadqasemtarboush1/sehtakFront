//Import Components
import styles from '../../styles/Visit.module.css'
import Navbar from "../../components/Navbar";
import Image from 'next/image';

// get our fontawesome imports
import { faPhone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Patient_visit() {
    return (
        <>
            <Navbar />
            <div className={styles.vHeader}>
                <div>
                    <h1 className={styles.title}>Visit - Pharmacist View</h1>
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
                    <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400 " >Description</label>
                    <textarea id="message" rows="9" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder="Please Dr. leave your comments here..." disabled></textarea>
                </div>
                <div className={styles.medicine}>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Medicine</label>
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Dr. leave your comments here..."></textarea>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Dose - Per day</label>
                        <input type="number" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <p className={styles.date} >Created Date: 14-9-2022</p>
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
                        <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed" placeholder="Please Dr. leave your comments here..." disabled></textarea>
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