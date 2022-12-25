import './App.css';
import { createHashRouter, RouterProvider, Navigate} from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import TvShows from './Components/TvShows/TvShows';
import People from './Components/People/People';
import NotFound from './Components/NotFound/NotFound';
import MovieDetails from './Components/MovieDetails/MovieDetails.jsx';
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import Profile from './Components/Profile/Profile';


function App() {
  let [userData,setUserData]= useState(null);
  function saveUser(){
   let token = localStorage.getItem("token");
   let decoded=jwt_decode(token);
   console.log(decoded);
   setUserData(decoded);
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser();
    }
  },[]);
  function ProductedRoute(props){
    if(localStorage.getItem('token')){
      return props.children
    }else{
      return <Navigate to='/login'/>
    }
  }
  function logOut(){
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/login'/>
  }
  const routers = createHashRouter([
    {path:'/',element: <MainLayout userData={userData} logOut={logOut}/>, children:[
      {index:true ,element:<ProductedRoute><Home/></ProductedRoute>},
      {path:'register',element:<Register />},
      {path: 'login' ,element:<Login saveUser={saveUser}/>},
      {path:'movies' ,element:<ProductedRoute><Movies/></ProductedRoute>},
      {path:'tvShows',element:<ProductedRoute><TvShows/></ProductedRoute>},
      {path:'people' ,element:<ProductedRoute><People/></ProductedRoute>},
      {path:'profile' ,element:<ProductedRoute><Profile userData={userData}/></ProductedRoute>},
      {path:'details/:id/:type',element:<ProductedRoute><MovieDetails/></ProductedRoute>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  return (
   <>
   <RouterProvider router={routers}/>
   </>
  );
}

export default App;