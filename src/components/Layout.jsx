import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  const [searchQuery, setSearchQuery] = useState(''); 

  return (
    <div>
      <NavBar onSearch={setSearchQuery} />  
      <div className="content">
        <Outlet context={{ searchQuery }} /> 
      </div>
    </div>
  );
}

export default Layout;
