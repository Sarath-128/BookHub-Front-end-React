import React from 'react'
import UserDetail from './UserDetail'
import CreateBook from './CreateBook'
import Trial from "./Trial"
import BookDetails from './BookDetails'
import CreateUser from './CreateUser'
import { Link, useNavigate } from 'react-router-dom'
import niceImage from './Image/SideBAr.png'

export default function Scrollspy() {
  const navigate = useNavigate()

  const Modify= ()=>{


   
    navigate('/userdetails/')
    
  }

  return (
    <body>

{/* NavBar */}

<nav class="navbar navbar-expand-lg bg-body-tertiary trial-nav">
  <div class="container-fluid" >
  <h2 className='text-center book' >Book<span className='Art'>MarT</span></h2>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link " aria-current="page"  href="#item-1">Book details</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#item-2">User Details</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#item-3" >Create Book</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#item-4" >Create Userk</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


{/* Side NavBar */}

<div className="row " style={{width: '100%'}} >
  <div className="col-4 static">
    <h2 className='text-center book bk text-primary'>Book<span className='Art'>MarT</span></h2><hr className='border align-item-center' style={{width: '100%',}} />
    <nav id="navbar-example3" class="h-100 flex-column align-items-stretch text-center mt-5 content ">
      <nav className="nav nav-pills flex-column">
        <a className="nav-link sidenav" href="#item-1">User Details</a>
        <a className="nav-link sidenav" href="#item-2">Book Details</a>
        <a className="nav-link sidenav" href="#item-3">Create Book</a>
        <a className="nav-link sidenav" href="#item-4">Create User</a>
      </nav>

    </nav>
    <div className='logout-btn text-center'>
    <Link to='/userdetails' style={{textDecoration:'none',color:'white'}}><i class="bi bi-pencil-square"></i> Modify</Link>
  
    </div>
    <div className='logout-btn text-center '>
     <p><Link to='/' style={{textDecoration:'none',color:'white'}}><i class="bi bi-box-arrow-right"></i> Logout</Link></p> 
    </div>
  </div>


{/* Contents in right side of the NavBar */}

  <div className="col-8 scrollable-content">
    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
      <div id="item-1" className='bookcont' >
        {/* <BookDetails/> */}
        <UserDetail/>
        <hr className=" border-2 border-top " />
      </div>
      
      <div id="item-2"  >
      <BookDetails/>
        {/* <UserDetail/> */}
        {/* <Trial/> */}
        <hr className=" border-2 border-top " />
        
      </div>

      <div id="item-3" style={{height: "100vh"}}>

      <CreateBook/>

      </div>

      <div id="item-4" >
      
      <CreateUser/>

      </div>

      
    </div>
  </div>
</div>






    </body>
  )
}
