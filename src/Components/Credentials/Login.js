import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [updateUser, setUpdateUser] = useState({});
  const navigate = useNavigate()

// Assign value from the input field
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUpdateUser({
      ...updateUser,
      [name]: value
  });
};

// Login function

const handleLogin = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch('http://127.0.0.1:8000/login/',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(updateUser)
      })
      if(response.status === 200){
        toast.success("Authentication successful");
        navigate('dashboard/')
      }else{
        toast.error("Authentication failed");
      }
      
  } catch (error) {
      toast.error("Login failed!");
  }
};





  return (
    <>
    <body className='body-register'>
 <div className='container container-register' style={{width:'40%', height:'100vh'}}>
<div className='innerDiv p-3 animate shadow' style={{paddingTop:'10%'}}>
    <h4 style={{marginBottom: "19px", textAlign:'center'}}>Hi There..!!</h4>
    <h2 style={{marginBottom: "19px", textAlign:'center'}}>Welcome Back👋,</h2>


{/* Register Form */}

  <form class="row g-4 needs-validation" onSubmit={handleLogin} novalidate>
  <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">Username</label>
    <input type="text" class="form-control inpu" name='username' id="validationTooltip01" onChange={handleInputChange} required></input>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>

  
  <div class="col-md-6 position-relative">
    <label for="validationTooltip03" class="form-label">Password</label>
    <input type="password" class="form-control inpu" name='password' id="validationTooltip03" onChange={handleInputChange} required></input>
    <div class="invalid-tooltip">
      Please provide a valid city.
    </div>
  </div>
 
  <div class="d-grid gap-2">
    <button class="btn  btn-outline-primary"  type="submit">Login</button>
  </div>
  <p style={{marginBottom: "19px", textAlign:'center'}}>Don't have an account?<Link to='/register'>click here</Link> </p>
</form>


</div>
</div> 
</body>  
    
    </>
  )
}
