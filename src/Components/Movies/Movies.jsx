import React,{useState,useEffect} from 'react';
import {Offline} from 'react-detect-offline';
import {Helmet} from 'react-helmet';
import Item from '../Item/Item.jsx';
import Loading from '../Loading/Loading.jsx';
import DetectOffline from '../DetectOffline/DetectOffline.jsx';
import axios from 'axios';

export default function Movies() {
  let[movies,setMovies]=useState([]);
  let[isLoading,setIsLoading]=useState(true);
  let[currentPage,setCurrentPage]=useState(1);

  let maxPages = 1000;
  let items = [];
  let leftSide = currentPage - 2;
  if(leftSide <= 0)leftSide=1;
  let rightSide = currentPage + 2;
  if(rightSide>maxPages)rightSide = maxPages;
  
  async function getTrending(type,dest){
    let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=${currentPage}`)
    console.log(data);
    dest(data.results);
    setIsLoading(false);
  }

  async function searchMovies(e){
    if(e.target.value){
      let {data}=  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
      console.log(data);
      setMovies(data.results);
    }else{
      getTrending('movie',setMovies);
    }}

    useEffect(()=>{
      getTrending('movie',setMovies);
    },[currentPage]);

    for(let number =leftSide;number<=rightSide;number++){
      items.push(
        <div key={number} className={(number === currentPage?'rounded-effect active':'rounded-effect')} onClick={()=>{setCurrentPage(number)}}><a href="#" className='text-decoration-none text-white'>{number}</a></div>
      )
    }
    function nextPage(){
      if (currentPage<maxPages){
        setCurrentPage(currentPage+1);
      }
    }

    function prevPage(){
      if(currentPage>1){
        setCurrentPage(currentPage-1);
      }
    }

  return (
    <>
    <Offline><DetectOffline/></Offline>
    {isLoading && <Loading/>}
    {!isLoading && <>
      <Helmet>
      <title>Movies Page | Movie App</title>
    </Helmet>
    <div className="container pt-5">
    <div className="row mt-5">
    <div className="px-2">
      <input type='text' onChange={searchMovies}className='form-control bg-search mb-5 px-3 py-2 rounded-pill border-info' placeholder='Search .....'></input>
      </div>
      {movies?.map(movie=><Item key={movie.id} data={movie} type={`movie`}/>)}
    </div>
    <div className='paginate-ctn'>
      {currentPage<=1?'':<div  className='cursor fw-bolder fs-5 mx-3' onClick={prevPage}>&lsaquo;</div>}
      {items}
      {currentPage>=maxPages?'':<div className=' cursor fw-bolder fs-5 mx-3' onClick={nextPage}>&rsaquo;</div>}
    </div>
</div>
</>}
    </>
  )
}
