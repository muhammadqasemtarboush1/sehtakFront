import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from '../../styles/Visit.module.css'
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "nprogress/nprogress.css";
import NProgress from 'nprogress';



// get our fontawesome imports
import { faPhone, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Doctor_card() {
    
    const CreateVisitURL = "https://sehtak.herokuapp.com/api/v1/visits/create/"
    
    const router = useRouter();
    const {id} = router.query

    const [centerCard,setCenterCard] = useState({});

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)


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
    
    async function CreateVisit(){
        NProgress.start()
        const config = {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
        };
        let accessData = null
        let patientID =null
        let doctorID = null
        
        if (typeof window !== 'undefined') {
        accessData = JSON.parse(localStorage.getItem("AuthTokens")).access
        patientID = jwt_decode(accessData).info_id
        doctorID = centerCard.id
        }    
        const ses = CreateVisitURL
        const userInput ={
            "description": "",
            "medicine": "",
            "medicine_status": false,
            "test_description": "",
            "test_attachments": "",
            "x_rays_description": "",
            "x_rays_attachments": "",
            "visit_status": true,
            "doctor": doctorID
        }
        try {
          const res = await axios.post(ses, userInput, config);
    
          if (res.status === 400) {
            console.log(`${res.status} bad request`)
            NProgress.done()
          }
          if (res.status === 201 || res.status === 200) {
            router.push('/account/vistisInfo?visitAdded=added');
          }
        }
        catch (error) {
          console.log(` Error Signing in: ${error}`)
          NProgress.done()
        }
    } 

    return (
        <>
            <Navbar />
            <div className='main'>
                <div>
                    <h1 className={styles.titleb}>Doctor Card</h1>
                    <Image src='/images/doc_prof.png' alt='' height='230' width='230' />
                </div>
                <div>
                    <p className={styles.title}> Dr. {centerCard.name}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faPhone} /></span> {centerCard.phone}</p>
                    <p className={styles.title}><span><FontAwesomeIcon icon={faMapLocationDot} /> Location</span></p>
                    {/* <p>{typeof(centerCard.location)}</p> */}
                    <iframe id='iframeId' height="300px" width="140%"></iframe>
                </div>
                <div>
                    <button onClick={CreateVisit} className={styles.visitButton}> Visit</button>
                </div>
            </div>
            <Footer />
        </>
    )
}