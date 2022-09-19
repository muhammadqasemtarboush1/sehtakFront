import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../styles/Visit.module.css'
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";





// get our fontawesome imports
import { faPhone, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Doctor_card() {

    const router = useRouter();
    const {id} = router.query

    const [centerCard,setCenterCard] = useState({});

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)


    const getCenterCard = async () => {
        try{
            const response = await axios.get(`https://sehtak.herokuapp.com/pharmacist/profile/${id}`);
            setCenterCard(response.data);
            console.log(centerData)
        } 
        catch(error){
            console.log(error)
        }
    }



    const split_loc = async () =>{
        try{
        const location_arr = await centerCard.location.split(',')
        setLat(location_arr[0])
        setLon(location_arr[1])
        const ifameData = document.getElementById("iframeId")
        // const lat= location_arr[0];
        // const lon= location_arr[1];
        ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
        }
        catch(e){
            console.log(e)
        }

        // return location_arr
    }

    useEffect(()=>{
        getCenterCard();
        split_loc();
    })

    // useEffect(()=>{
    //     // const ifameData = document.getElementById("iframeId")
    //     // const lat= location_arr[0];
    //     // const lon= location_arr[1];
    //     // // console.log(lat,lon)
    //     // // const lat= 30.545455;
    //     // // const lon= 35.0000000;
    //     // ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // },{})
    return (
        <>
            <Navbar />
            <div className='main'>
                <div>
                    <h1 className={styles.titleb}>Pharmacy Card</h1>
                    <Image src='/images/profile_icon.png' alt='' height='230' width='230' />
                </div>
                <div>
                    <p className={styles.title}> Pharmacy Name:  {centerCard.name}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faPhone} /></span> {centerCard.phone}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faMapLocationDot} /> Location</span></p>
                    {/* <p>{typeof(centerCard.location)}</p> */}
                    <iframe id='iframeId' height="300px" width="140%"></iframe>
                </div>
                <div>
                    <button className={styles.visitButton}> Visit</button>
                </div>
            </div>
            <Footer />
        </>
    )
}