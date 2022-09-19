//Import Components
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import Head from 'next/head'


export default function Footer(){
    return(
        <>
        <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
            <Image src='/images/logo.png' width='120' height='50' alt="Flowbite Logo" />
            {/* <span class="self-center text-2xl font-semibold whitespace-nowrap">Healthcare for you</span> */}
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="/Info/PrivacyPolicy" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Sehtak™. All Rights Reserved.
    </span>
</footer>
        </>
    )
}