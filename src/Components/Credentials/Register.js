import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import { Link } from 'react-router-dom';

export default function Register() {

  const [updateUser, setUpdateUser] = useState({});

  // Assign value from the input field
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdateUser({
          ...updateUser,
          [name]: value
      });
  };

  // Initialize AOS
  useEffect(() => {
      AOS.init({
          duration: 1000,
          
      });
  }, [AOS]);

  // After submitting creating new user with API
  const handleSubmit = async (e) => {
      e.preventDefault();

      if(!checkVAlidation()){
        return;
    }

      try {
          await axios.post(`http://127.0.0.1:8000/register/`, updateUser);
          toast.success("Registration successful");
      } catch (error) {
          toast.error("Book creation failed!");
      }
  };

  // Checking Validation

  const checkVAlidation = () =>{
    const requiredField = ['name','username','password','con_password']
    for(const field of requiredField){
        if(!updateUser[field]){
            toast.warning(`${field.replace('_','')} is required`,{
               
                theme : 'colored;'
            });
            return false;
        }
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(!emailRegex.test(updateUser.email.toLowerCase())){
    //     toast.warning("Please Enter Valid mail id",{
    //         position : toast.POSITION.TOP_CENTER,
    //         theme : 'colored;'
    //     });
    //     return false;
    // }
    if(updateUser.password !== updateUser.con_password){
        toast.warning("Password Miss Match",{
            // position : toast.POSITION.TOP_CENTER,
            theme : 'colored;'
        });return false;
    }
    return true;
}

    
  return (
    <>
<body className='body-register'>
 <div className='container container-register' style={{width:'40%', height:'100vh'}}>
<div className='innerDiv p-3 animate shadow' style={{paddingTop:'10%'}}>
    <h4 style={{marginBottom: "19px", textAlign:'center'}}>Hi There..!!</h4>
    <h2 style={{marginBottom: "19px", textAlign:'center'}}>Welcome👋,</h2>


{/* Register Form */}

        <form class="row g-3 needs-validation" onSubmit={handleSubmit} novalidate>
  <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">Name</label>
    <input type="text" class="form-control inpu" name='name' id="validationTooltip01" onChange={handleInputChange} ></input>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>

  
  <div class="col-md-6 position-relative">
    <label for="validationTooltip03" class="form-label">Username</label>
    <input type="text" class="form-control inpu" name='username' id="validationTooltip03" onChange={handleInputChange} ></input>
    <div class="invalid-tooltip">
      Please provide a valid city.
    </div>
  </div>
 

  <div class="col-md-3 position-relative">
    <label for="validationTooltip05" class="form-label">Password</label>
    <input type="password" class="form-control inpu" name='password' id="validationTooltip05" onChange={handleInputChange} ></input>
    <div class="invalid-tooltip">
      Please provide a valid zip.
    </div>
  </div>

  <div class="col-md-4 position-relative">
    <label for="validationTooltip05" class="form-label">Confirm Password</label>
    <input type="password" class="form-control inpu" name='con_password' id="validationTooltip05" onChange={handleInputChange} ></input>
    <div class="invalid-tooltip">
      Please provide a valid zip.
    </div>
  </div>


  <div class="d-grid gap-2">
    <button class="btn  btn-outline-primary"  type="submit">Register</button>
  </div>
  <p style={{marginBottom: "19px", textAlign:'center'}}>Already have an account? <Link to='/'>click here</Link></p>
</form>


</div>
</div> 
</body>  
    </>

  )
}
