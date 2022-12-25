import React from 'react';
import {Link} from 'react-router-dom';


export default function Item({data,type}) {
  return (
    <>
    <div className="col-lg-2 col-md-3 position-relative">
    <div className="item position-relative overflow-hidden">
      {data.poster_path? <img src={"https://image.tmdb.org/t/p/w500"+data.poster_path} className='w-100' alt="" />:''}
      {data.profile_path? <img src={"https://image.tmdb.org/t/p/w500"+data.profile_path} className='w-100' alt="" />:''}
      <Link to={'/details/'+ data.id +'/'+ type}> <div className="overlay p-2 text-white text-center d-flex justify-content-center align-items-center">
        {data.overview?data.overview.split(" ").splice(0,15).join(" ")+'...':data.known_for_department}
        </div>
      </Link>
      {data.vote_average?<><div className="vote position-absolute top-0 end-0 fw-bold">
      {data.vote_average?.toFixed(1)}
      </div></>:""}
      {data.known_for_department? <><div className="known position-absolute bottom-0 start-0 fw-bold">
      {data.known_for_department}
      </div></>:''}
      </div>
      <h5 className='mt-2 mb-5 fs-5'>{data.title}{data.name}</h5>
      </div>
    </>
  )
}
