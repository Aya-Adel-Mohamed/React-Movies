import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Joi from 'joi';

export default function Login({saveUser}) {
let [user,setUser] = useState({
  email:"",
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
},[user])

async function login(e){
  e.preventDefault();
  if(validateUser()){
  setIsLoading(true)
  let {data} = await axios.post('https://route-movies-api.vercel.app/signin',user);
  console.log(data)
  if(data.message =="success"){
  localStorage.setItem('token',data.token);
  saveUser();
  navigate('/')
  setIsLoading(false);
  setApiError(null)
}else{
  setApiError(data.message);
  setIsLoading(false);
}}
}
function validateUser(){
  let schema = Joi.object({
  email:Joi.string().email({minDomainSegments:2,tlds:{allow:false}}).messages({
    "string.empty":"Email is Reqired",
  }),
  password:Joi.string().pattern(new RegExp(/^[A-Za-z0-9]{3,8}$/)).messages({
    "string.empty":"Password is Required",
    "string.pattern.base":"Invalid Password",
  }),
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
    <title>Login Page | Movie App</title>
  </Helmet>
    <div className="container">
      <div className='mx-auto w-75'>
      <h3 className='mt-5 mb-4 fw-bold text-info'>Login form</h3>
      {apiError && <div className='alert alert-danger'>{apiError}</div>}
      <form onSubmit={(e)=> login(e)}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={(e)=>getUserData(e) }id="email" className={validationError.filter(ele => ele.context.label =="email")[0]?"is-invalid form-control":"form-control"}  name="email" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="email")[0]?.message}</p>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password"onChange={(e)=>getUserData(e) } id="password" className={validationError.filter(ele => ele.context.label =="password")[0]?"is-invalid form-control":"form-control"}  name="password" />
          <p className='text-danger fw-bold'>{validationError.filter(ele => ele.context.label =="password")[0]?.message}</p>
        </div>
        <div className="d-flex align-items-center ">
        <p className='pt-4'>don't have account ? <Link to='/register' className='text-decoration-none text-white'>Register</Link></p>
        <button className='btn btn-outline-info d-flex ms-auto p-2'>
          {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}
        </button>
        </div>
      </form>
      </div>
    </div>
    </>
  )
}

