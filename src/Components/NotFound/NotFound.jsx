import React from 'react';
import {Helmet} from 'react-helmet';

export default function NotFound() {
  return (
    <>
     <Helmet>
      <title>Not Found Page | Movie App</title>
    </Helmet>
    <div className='container'>
      <div className="row py-5 mt-5 text-center">
        <h1 className='mt-5 notfound'>404</h1>
        <h3>Sorry, Page Not Found</h3>
        <p>The page you requested could not be found</p>
      </div>
    </div>
    </>
  )
}
