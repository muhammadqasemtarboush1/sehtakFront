import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component'
import styles from '/styles/Professional.module.css'



const LabsTable = () =>{
    const [countries,setCountries] = useState([]);
    const getCountries = async () => {
        try{
            const response = await axios.get('https://sehtak.herokuapp.com/auth/labs/');
            setCountries(response.data);
            console.log(countries)
        } 
        catch(error){
            console.log(error)
        }
    }
    const columns =[
        {
            name: 'Lab Name',
            selector: row => row.name
        },
        {
            name: 'Phone Number',
            selector: row => row.phone
        },
        {
            name: 'Location',
            selector: row => row.city
        },
        {
            name: ' ',
            selector: row => <button className={styles.visitButton}>Visit</button>
        }
    ]
    useEffect(()=>{
        getCountries();
    },[])
    return(
        <>
        <DataTable columns={columns} data={countries}/>
        </>
    )
}
export default LabsTable