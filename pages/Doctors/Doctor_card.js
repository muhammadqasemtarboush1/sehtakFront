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
    const [locLoad, isLocLoad] = useState(false)

    const getCenterCard = async () => {
        try{
            const response = await axios.get(`https://sehtak.herokuapp.com/doctors/profile/${id}`);
            setCenterCard(response.data);
            console.log(centerData)
        } 
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getCenterCard();
    },{})


    function split_loc(){
        const location_arr = centerCard.location.split(',')
        return location_arr
    }

    // useEffect(()=>{
    //     const ifameData = document.getElementById("iframeId")
    //     const lat= split_loc()[0];
    //     const lon= split_loc()[1];
    //     ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // },{})
    return (
        <>
            <Navbar />
            <div className='main'>
                <div>
                    <h1 className={styles.titleb}>Doctor Card</h1>
                    <Image src='/images/profile_icon.png' alt='' height='230' width='230' />
                </div>
                <div>
                    <p className={styles.title}> Dr. {centerCard.name}</p>
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