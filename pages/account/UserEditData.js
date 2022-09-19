import React, { useState } from 'react'
import Image from 'next/image'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import jwt_decode from "jwt-decode";

import { useRouter } from 'next/router';
import "nprogress/nprogress.css";
import NProgress  from 'nprogress';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function UserData() {


  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    phone: Yup.string()
        .required("This field is Required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ),
    gender: Yup.string()
        .required('Gender is required'),
    height: Yup.required('Only Numbers')
      .number("Only Numbers"),
    weight: Yup.required('Only Numbers')
          .number('Only Numbers'),
      
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;


  
  // const EditUserInfo = "https://sehtak.herokuapp.com/auth/profile/";

  
  const [startDate, setStartDate] = useState(new Date());
  const divStyle = "grid grid-rows-2 mb-5"
  const lableStyle = "font-sans text-lg text-white"
  const inputStyle = "rounded-lg w-52"
  const router = useRouter();

  
  const editUserUrl ="https://sehtak.herokuapp.com/profile/"
  
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
    let ses = editUserUrl + accessData+"/"

    try {
        const res = await axios.put(ses, userInput,config);
        
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

  async function handleEditSubmit(data){
    const my_user_id  = JSON.parse(localStorage.getItem("AuthTokens")).access.user_id
    e.preventDefault()
    let dataInfo ={
      "user": my_user_id,
      "first_name": data.firstName < 1  ? null: e.target.firstName.value,
      "last_name": data.lastName < 1  ? null:e.target.lastName.value,
      "phone": data.phone < 1  ? null:"+962776280034",
      "birth_date": null,
      "gender": data.gender < 1  ? null:data.gender,
      "height": data.hight < 1  ? null:data.hight,
      "weight": data.weight < 1  ? null:data.weight,
      "blood_type": data.blood_type < 1  ? null: data.blood_type,
      "allergies": data.allergies < 1  ? null:data.allergies
    }
    console.log(dataInfo)
    await editProfileInfo(dataInfo)
  }

  
  return (
    <>
    
    <div className='h-screen backGroundCoverImage'>
      <div className='flex h-20 py-3 pl-12 bg-gradient-to-r from-teal-100 to-teal-50'> 
          <Image src="/images/logo.png" width={140} height={30} className='ml-3'/> 
      </div>
      <div className='ml-5 text-4xl text-green-600'>Information Edit</div>
        <form onSubmit={handleSubmit(handleEditSubmit)}>
          <div className='flex flex-wrap justify-around max-w-3xl p-5 ml-5 bg-teal-300 rounded-md'>
            <div className=''>

              <div className={divStyle}>
                <label className={lableStyle} for="firstName">First Name</label>
                <input name='firstName' {...register('firstName')} className={inputStyle + ` ${errors.firstName ? 'is-invalid' : ''}`}/>
                <div className="text-red-600">{errors.firstName?.message}</div>
              </div>

              <div className={divStyle}>  
                <label className={lableStyle} for="lastName">Last Name</label>
                <input name='lastName' id='lastName' {...register('lastName')} className={inputStyle + ` ${errors.lastName ? 'is-invalid' : ''}`}/>
                <div className="text-red-600">{errors.lastName?.message}</div>
              </div>
              
              <div className={divStyle + lableStyle}> Gender
                <input  id="female" type="radio" value="1" name="gender"/>
                <label for="female">Female</label>
                <input  id="male" type="radio" value="0" name="gender"/>
                <label for="male">Male</label>
              </div>
              
              
              <div>
                
                <div className={divStyle}>
                  <label className={lableStyle} for="hight">Height <span>in cm</span></label>
                  <input name='hight' id='hight' {...register('height')} className={inputStyle + ` ${errors.height ? 'is-invalid' : ''}`}/>
                  <div className="text-red-600">{errors.height?.message}</div>
                </div>

                <div className={divStyle}>
                  <label className={lableStyle} for="weight">Weight <span>in kg</span></label>
                  <input  {...register('weight')} className={inputStyle + ` ${errors.weight ? 'is-invalid' : ''}`} name='weight' id='weight'/>
                  <div className="text-red-600">{errors.weight?.message}</div>
                </div>
                
              </div>
              
              <div>
                <label for="countries" className="">Select an option</label>
                <select id="countries" name='blood_type' className="">
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

            
            <div className=''>
              
              <div className={divStyle}>
                <label className={lableStyle} for="phone">Phone Number</label>
                <input name='phone' {...register('phone')} className={inputStyle + ` ${errors.phone ? 'is-invalid' : ''}`}/>
                <div className="text-red-600">{errors.phone?.message}</div>
              </div>
              
              <div className={divStyle}>
                <label className="h-5 font-sans text-lg text-white align-bottom" for="datepicker">Birth Date</label>
                <div><DatePicker className={inputStyle} id='datepicker' selected={startDate} onChange={(date) => setStartDate(date)} /></div>
              </div>
              
              <div className={divStyle}>
                <label className={lableStyle}  for="allergies" >Allergies</label>
                <input className={inputStyle} type="text" id='allergies' name='allergies' />
              </div>

              <div>
                <input className='bg-sky-600' type="submit" value='Create Account' />
              </div>
            </div>
            
          </div>
        </form>
    </div>
    </>
    
  )
}
