import {Helmet} from 'react-helmet';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
let [user,setUser] = useState({
  first_name:"",
  last_name:"",
  email:"",
  age:0,
  password:"",
})
let[validationError,setValidationError]=useState([]);
let[apiError,setApiError]=useState(null);
let[isLoading,setIsLoading]=useState(false);
let navigate = useNavigate();

  function getUserData(e){
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  useEffect(()=>{
    console.log(user);
  },[user]);
  async function register(e){
    e.preventDefault();
    if(validateUser()){
    setIsLoading(true);

let {data} = await axios.post('https://route-movies-api.vercel.app/signup',user);
console.log(data)
if(data.message =="success"){
navigate('/login')
setIsLoading(false);
setApiError(null)
}else{
setApiError(data.message);
setIsLoading(false);
}}
  }

  function validateUser(){
    let schema = Joi.object({
      first_name:Joi.string().min(3).max(10).required().messages({
        "string.empty":"First Name is Required",
        "string.min":"you have to enter more than 3 character",
      }),
      last_name: Joi.string().min(3).max(10).required().messages({
        "string.empty":"Last Name is Required",
        "string.min":"you have to enter more than 3 character",
      }),
      email:Joi.string().email({minDomainSegments:2,tlds:{allow:false}}).messages({
        "string.empty":"Email is Reqired",
      }),
      password:Joi.string().pattern(new RegExp(/^[A-Za-z0-9]{3,8}$/)).messages({
        "string.empty":"Password is Required",
        "string.pattern.base":"Invalid Password",
      }),
      age:Joi.number().min(16).max(35).required().messages({
        "number.min":"Age must be greater than 16"
      })
    });
    
    let validations = schema.validate(user,{abortEarly: false})
    console.log(validations)
    if(validations.error){
      setValidationError(validations.error.details);
      return false
    }else{
      return true
    }
  }
  return (
    <>
    <Helmet>
      <title>Register Page | Movie App</title>
    </Helmet>
    <div className="container">
      <div className='mx-auto w-75'>
      <h3 className='mt-5 mb-4 fw-bold text-info'>Registeration form</h3>
      {apiError && <div className='alert alert-danger'>{apiError}</div>}
      {/* {validationError.map(ele =>(
        <div className='alert alert-danger'>{ele.message}</div>
      ))} */}
      <form onSubmit={(e)=>register(e)}>
        <div className="form-group mb-1">
          <label htmlFor="first_name">First Name</label>
          <input type="text" onChange={(e)=>getUserData(e) }id="first_name" className={validationError.filter(ele => ele.context.label =="first_name")[0]?"is-invalid form-control":"form-control"} name="first_name" />
        <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="first_name")[0]?.message}</p>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" onChange={(e)=>getUserData(e) }id="last_name" className={validationError.filter(ele => ele.context.label =="last_name")[0]?"is-invalid form-control":"form-control"}  name="last_name" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="last_name")[0]?.message}</p>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={(e)=>getUserData(e) }id="email" className={validationError.filter(ele => ele.context.label =="email")[0]?"is-invalid form-control":"form-control"}  name="email" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="email")[0]?.message}</p>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="password">Password</label>
          <input type="password"onChange={(e)=>getUserData(e) } id="password" className={validationError.filter(ele => ele.context.label =="password")[0]?"is-invalid form-control":"form-control"}  name="password" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="password")[0]?.message}</p>
        </div>
        <div className="form-group mb-1">
          <label htmlFor="age">Age</label>
          <input type="number"onChange={(e)=>getUserData(e) } id="age" className={validationError.filter(ele => ele.context.label =="age")[0]?"is-invalid form-control":"form-control"}  name="age" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="age")[0]?.message}</p>
        </div>
        
        <button className='btn btn-outline-info d-flex ms-auto p-2 mt-4 fs-6'>
          {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Sign Up"}
        </button>
      </form>
      </div>
      
    </div>
    </>
  )
}
