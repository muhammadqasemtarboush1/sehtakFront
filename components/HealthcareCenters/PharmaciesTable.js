import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component'
import styles from '/styles/Professional.module.css'
import Image from "next/image";


const DoctorsTable = () =>{
    const [centerData,setCenterData] = useState([]);
    const [search,setSearch] = useState("");
    const [searchCity, setSearchCity] = useState("")

    const [filteredCenterData,setFilteredCenterData] = useState([]);

    const getCenterData = async () => {
        try{
            const response = await axios.get('https://sehtak.herokuapp.com/auth/pharmacists/');
            setCenterData(response.data);
            setFilteredCenterData(response.data);
            console.log(centerData)
        } 
        catch(error){
            console.log(error)
        }
    }
    const columns =[
        {
            name: 'Pharmacy Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Phone Number',
            selector: row => row.phone
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true
        },
        {
            name: ' ',
            selector: row => <button className={styles.visitButton} onClick={() =>{alert('After clicking on view it should redirect the user to the doctor profile page')}} >View</button>
        }
    ]
    useEffect(()=>{
        getCenterData();
    },[])

    useEffect(()=>{
        const result = centerData.filter(center =>{
            return center.name.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCenterData(result)
    },[search]);

    useEffect(()=>{
        const result = centerData.filter(center =>{
            return center.city.toLowerCase().match(searchCity.toLowerCase());
        });
        setFilteredCenterData(result)
    },[searchCity]);


    return(
        <>
        <DataTable
            title ='Pharmacies'
            columns={columns}
            data={filteredCenterData}
            subHeader
            subHeaderAlign="left"
            subHeaderComponent ={
            <>
            <input 
                type='text'
                placeholder='Search by Name'
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                />
            <Image src='/images/search.jpg' alt='' width='45' height='45' />
            <input 
                type='text'
                placeholder='Search by City'
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchCity}
                onChange={(e)=> setSearchCity(e.target.value)}
                />
            <Image src='/images/location.jpg' alt='' width='45' height='45' />
            </>
        }
        />
        </>
    )
}
export default DoctorsTable