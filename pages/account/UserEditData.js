import React, { useState } from 'react'
import Image from 'next/image'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import jwt_decode from "jwt-decode";

import { useRouter } from 'next/router';
import "nprogress/nprogress.css";
import NProgress from 'nprogress';

import styles from '../../styles/UserEditData.module.css'

export default function UserData() {

  // const EditUserInfo = "https://sehtak.herokuapp.com/auth/profile/";


  const [startDate, setStartDate] = useState(new Date());
  const divStyle = "grid grid-rows-2 m-8"
  // const lableStyle = "font-sans text-lg text-white"
  const inputStyle = "rounded-lg w-52"
  const router = useRouter();


  const editUserUrl = "https://sehtak.herokuapp.com/profile/"

  async function editProfileInfo(userInput) {
    NProgress.start()
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("AuthTokens")).access}` }
    };

    let accessData = null
    if (typeof window !== 'undefined') {
      accessData = JSON.parse(localStorage.getItem("AuthTokens")).access
      accessData = jwt_decode(accessData).info_id

    }
    let ses = editUserUrl + accessData + "/"

    try {
      const res = await axios.put(ses, userInput, config);

      if (res.status === 400) {
        console.log(`${res.status} bad request`)
        NProgress.done()
      }
      if (res.status === 201 || res.status === 200) {
        router.push('vistisInfo');
      }
    }
    catch (error) {
      console.log(` Error Signing in: ${error}`)
      NProgress.done()
    }
  }

  async function handleEditSubmit(e) {
    const my_user_id = JSON.parse(localStorage.getItem("AuthTokens")).access.user_id
    e.preventDefault()
    let dataInfo = {
      "user": my_user_id,
      "first_name": e.target.firstName.value.length < 1 ? null : e.target.firstName.value,
      "last_name": e.target.lastName.value.length < 1 ? null : e.target.lastName.value,
      "phone": "+962776280034".length < 1 ? null : "+962776280034",
      "birth_date": "1999-09-18",
      "gender": e.target.gender.value.length < 1 ? null : e.target.gender.value,
      "height": e.target.hight.value.length < 1 ? null : e.target.hight.value,
      "weight": e.target.weight.value.length < 1 ? null : e.target.weight.value,
      "blood_type": e.target.blood_type.value.length < 1 ? null : e.target.blood_type.value,
      "allergies": e.target.allergies.value.length < 1 ? null : e.target.allergies.value
    }
    console.log(dataInfo)
    await editProfileInfo(dataInfo)
  }
  return (
    <>
      <div className='h-screen backGroundCoverImage'>
        <div className='flex h-20 py-3 pl-12 bg-gradient-to-r from-teal-100 to-teal-50'>
          <Image src="/images/logo.png" width={140} height={30} className='ml-3' />
        </div>
        <div>
          {/* <p className={styles.title}> Fill your information </p> */}
        </div>
        <form onSubmit={handleEditSubmit}>
        <p className={styles.title}> Fill Your Information </p>
          <div className={styles.component}>
            <div className=''>
              <div className={divStyle}>
                <label className={styles.labelStyle} for="firstName">First Name</label>
                <input className={inputStyle} name='firstName' />
              </div>
              <div className={divStyle}>
                <label className={styles.labelStyle} for="phone">Phone Number</label>
                <input className={inputStyle} name='phone' />
              </div>

              <div className={styles.labelStyle}>
                <p>Gender</p>
                <input id="female" type="radio" value="1" name="gender" />
                <label for="female">Female</label>
                <input id="male" type="radio" value="0" name="gender" />
                <label for="male">Male</label>

              </div>


              <div>

                <div className={divStyle}>
                  <label className={styles.labelStyle} for="hight">Height <span>in cm</span></label>
                  <input className={inputStyle} name='hight' id='hight' />
                </div>

                <div className={divStyle}>
                  <label className={styles.labelStyle} for="weight">Weight <span>in kg</span></label>
                  <input className={inputStyle} name='weight' id='weight' />
                </div>

              </div>

              <div>

                <input className={styles.createButton} type="submit" value='Create Account' />
              </div>

            </div>


            <div className=''>

              <div className={divStyle}>
                <label className={styles.labelStyle} for="lastName">Last Name</label>
                <input className={inputStyle} name='lastName' id='lastName' />
              </div>

              <div className={divStyle}>
                <label className={styles.labelStyle} for="datepicker">Birth Date</label>
                <div><DatePicker className={inputStyle} id='datepicker' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
              </div>

              <div className={divStyle}>
                <label className={styles.labelStyle} for="allergies" >Allergies</label>
                <input className={inputStyle} type="text" id='allergies' name='allergies' />
              </div>

              <div>
              {/* <label for="countries" className={styles.labelStyle + divStyle}>Select an option</label> */}
                <select id="countries" name='blood_type' className={styles.labelStyle}>
                  <option selected>Choose a Blood Type</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>

  )
}
