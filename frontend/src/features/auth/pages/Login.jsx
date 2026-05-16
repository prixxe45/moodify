import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

  const {loading, handleLogin} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleSubmit = async(e) => {
  e.preventDefault();
  // Handle login logic here
  await handleLogin({username, password});
  navigate("/");
}

  return (
    <main className="login-page">
     

      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

          <FormGroup
           label="Username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <FormGroup label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  );
}

export default Login