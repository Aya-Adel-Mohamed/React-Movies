import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

export default function Header() {
let[movies,setMovies]=useState([]);
    async function getTrending(type,dest){
        let {data}=  await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff`)
        console.log(data);
        dest(data.results);
    }

useEffect(()=>{
    getTrending('movie',setMovies);
},[]);

var settings={
    infinite:true,
    slidesToShow:8,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:2000,
}

return (
    <>
    <section id='header' className='d-lg-flex d-none justify-content-center align-items-end '>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-11 col-xl-12">
                    <h3 className='fs-3 fw-bolder header-p'>OUR LATEST MOVIES</h3>
                    <Slider {...settings}>
                        {movies.slice(0,15).map((movie,index)=>
                        <Link to={'/details/'+ movie.id +'/'+ movie.media_type} key={index}>
                            <div className="slider">
                                <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} className='w-100 ROUNDED' alt="" />
                            </div>
                        </Link>
                        )}
                    </Slider>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
