import React,{useState,useEffect} from 'react';
import Item from '../Item/Item.jsx';
import {Helmet} from 'react-helmet';
import {Offline} from 'react-detect-offline';
import Loading from '../Loading/Loading.jsx';
import DetectOffline from '../DetectOffline/DetectOffline.jsx';
import axios from 'axios';

export default function TvShows() {
  let[tv,setTv]=useState([]);
  let[isLoading,setIsLoading]=useState(true);
  let[currentPage,setCurrentPage]=useState(1);
  let maxPages = 1000;
  let items =[];
  let leftSide = currentPage - 2;
  if(leftSide<=0)leftSide=1;
  let rightSide = currentPage + 2;
  if(rightSide>maxPages)rightSide=maxPages;
  async function getTrending(type,dest){
    let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&page=${currentPage}`)
    console.log(data);
    dest(data.results)
    setIsLoading(false)
  }
  async function searchTv(e){
    if(e.target.value){
      let {data}=  await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&page=1&query=${e.target.value}&include_adult=false`)
      console.log(data);
      setTv(data.results)
    }else{
      getTrending('tv',setTv);
    }
  }
 
    useEffect(()=>{
      getTrending('tv',setTv);
    },[currentPage])

    for(let number =leftSide;number<=rightSide;number++){
      items.push(
        <div key={number} className={(number === currentPage?'rounded-effect active':'rounded-effect')} onClick={()=>{setCurrentPage(number)}}><a href="#" className='text-decoration-none text-white'>{number}</a></div>
      )
    }
 
    function nextPage(){
      if (currentPage<maxPages){
        setCurrentPage(currentPage+1)
      }
      
    }
    function prevPage(){
      if(currentPage>1){
        setCurrentPage(currentPage-1)
      }
   
    }
  return (
    <>
     <Offline><DetectOffline/></Offline>
    {isLoading && <Loading/>}
    {!isLoading && <>
      <Helmet>
      <title>TvShows Page | Movie App</title>
    </Helmet>
    <div className="container pt-5">
    <div className="row mt-5">
      <div className="px-2">
      <input type='text' onChange={searchTv}className='form-control bg-search mb-5 px-3 py-2 rounded-pill border-info' placeholder='Search .....'></input>
      </div>
      {tv?.map(movie=><Item key={movie.id} data={movie}/>)}
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
