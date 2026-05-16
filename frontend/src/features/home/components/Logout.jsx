import React from 'react'
import '../styles/logout.scss'
import { useAuth } from '../../auth/hooks/useAuth'


const Logout = () => {
  const { handleLogout } = useAuth();

  return (
     <div className="top-navbar">

      <div className="logo">
        Moodify
      </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>

    </div>
  );
}

export default Logout