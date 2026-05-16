import React from 'react'
import {useAuth} from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';
import "../style/loding.scss"

const Protected = ({children}) => {

const {user, loading} = useAuth();

if (loading) {
  return (
    <div className="music-loading">
      {/* Fog Overlay */}
      <div className="fog"></div>

      {/* Loader Content */}
      <div className="loader-content">
        <div className="vinyl">
          <div className="vinyl-center"></div>
        </div>

        <h1>Entering The Vibe</h1>

        <p>Please wait...</p>
      </div>
    </div>
  );
}
if(!user){
return <Navigate to = "/login" />
}



  return children;
}

export default Protected;