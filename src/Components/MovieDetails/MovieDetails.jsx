import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Offline} from 'react-detect-offline';
import {Helmet} from 'react-helmet';
import Loading from '../Loading/Loading.jsx';
import DetectOffline from '../DetectOffline/DetectOffline.jsx';
import axios from 'axios';

export default function MovieDetails() {
  let [details,setDetails]=useState(null);
  let[isLoading,setIsLoading]=useState(true);
  let {id,type}= useParams();
  console.log(id);
  async function getDetails (){
    let {data}= await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=1`);
    console.log(data)
    setDetails(data);
    setIsLoading(false)
  }
  useEffect(()=>{
  getDetails();
  },[])
  return (
    <>
     <Offline><DetectOffline/></Offline>
    {isLoading && <Loading/>}
    {!isLoading && <>
      <Helmet>
      {details.title?<title>{`${details?.title} | Movies Details`}</title>:<title>{`${details?.name} | Movies Details`}</title>}
    </Helmet>
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
           {details?.poster_path?<img src={"https://image.tmdb.org/t/p/w500"+details?.poster_path} className='w-100'alt="" />:""}
           {details?.profile_path?<img src={"https://image.tmdb.org/t/p/w500"+details?.profile_path} className='w-100'alt="" />:""}
        </div>
        <div className="col-md-8">
          <div className="item">
            <h1>{details?.title} {details?.name}</h1>
            <p className='fs-3 text-white-50 mt-1'>{details?.tagline}</p>
            {details?.known_for_department?<p className='fs-5 text-info fw-bold'>{details?.known_for_department}</p>:""}
            {details?.biography?<p className='fs-6 text-white-50'>{details?.biography}</p>:""}
            <ul className='list-unstyled d-flex'>
              {details?.genres?.map(genre=><div className='bg-info p-2 mx-2 rounded-2 fs-6 mb-2'>{genre.name}</div>)}
            </ul>
            {details?.vote_average?<p className='fs-5 my-4'>Vote : {details?.vote_average}</p>:''}
            {details?.vote_count?<p className='fs-5 mb-4'>Vote count : {details?.vote_count}</p>:''}
            {details?.birthday?<p className='fs-5 '>birthday : {details?.birthday}</p>:""}
            {details?.deathday?<p className='fs-5 '>deathday : {details?.deathday}</p>:""}
            {details?.place_of_birth?<p className='fs-5'>place of birth : {details?.place_of_birth}</p>:""}
            {details?.popularity?<p className='fs-5 mb-4'>Popularity : {details?.popularity}</p>:''}
            {details?.release_date?<p className='fs-5 mb-5'>release date : {details?.release_date}</p>:''}
            {details?.first_air_date?<p className='fs-5 mb-5'>release date : {details?.first_air_date}</p>:''}
            {details?.overview?<p className='fs-4 text-white-50'>{details?.overview}</p>:""}
          </div>
        </div>
      </div>
    </div>
    </>}
    </>
  )
}
