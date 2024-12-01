import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className='text-center'>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <Link to={"/contacts"}>
        <button className='btn btn-success'>See Contacts</button>
      </Link>
    </div>
  );
}

export default Home;
