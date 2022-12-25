import React,{useEffect,useState} from 'react';
import {Offline} from 'react-detect-offline';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Item from '../Item/Item.jsx';
import Loading from '../Loading/Loading.jsx';
import Header from '../Header/Header.jsx';
import DetectOffline from '../DetectOffline/DetectOffline.jsx';

export default function Home() {
  let[movies,setMovies]=useState([]);
  let[tv,setTv]=useState([]);
  let[person,setPerson]=useState([]);
  let[isLoading,setIsLoading]=useState(true);
  async function getTrending(type,dest){
  let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=1`)
  console.log(data);
  dest(data.results);
  setIsLoading(false);
}
useEffect(()=>{
  getTrending('movie',setMovies);
  getTrending('tv',setTv);
  getTrending('person',setPerson);
},[]);

return (
  <>
    <Offline><DetectOffline/></Offline>
    {isLoading && <Loading/>}
    {!isLoading && <>
    <Header/>
    <Helmet>
      <title>Home Page | Movie App</title>
    </Helmet>
   <div className="container pt-5">
      <div className="row mt-5">
          <div className="col-lg-4 col-md-6">
            <div className="content d-flex justify-content-center flex-column h-100">
              <h2 className='position-relative'>Trending <br/>Movies <br/> To Watch Right Now</h2>
              <p className='text-white-50 fs-5'>most watched movies by days</p>
            </div>
          </div>
          {movies?.slice(0,10).map(movie=><Item key={movie.id} data={movie}/>)}
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6">
            <div className="content d-flex justify-content-center flex-column h-100">
              <h2 className='position-relative'>Trending <br/>Tv <br/> To Watch Right Now</h2>
              <p className='text-white-50 fs-5'>most watched tv by days</p>
            </div>
          </div>
          {tv?.slice(0,10).map(tv=><Item key={tv.id} data={tv}/>)}
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6">
            <div className="content d-flex justify-content-center flex-column h-100">
              <h2 className='position-relative'>Trending <br/>People<br/> To Watch Right Now</h2>
              <p className='text-white-50 fs-5'>most watched people by days</p>
            </div>
          </div>
          {person?.slice(0,10).map(person=><Item key={person.id} data={person}/>)}
        </div>
    </div>
    </>}
    </>
  )
}
