import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import { Link, useNavigate } from 'react-router-dom'


export default function Scrollspy() {
    const [User,setUser] = useState([])
    const [updateUser, setUpdateUser] = useState({}) 
  
  // fetch Book details to Book
  
    const fetchUser = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/create_user/') ;
        setUser(response.data)
      }catch(error){
        console.log("Errorr indd")
      }
    }
  
    useEffect(()=>{

      fetchUser();
      AOS.init({
        duration: 1200, 
       
      });
      
    },[User,updateUser]);
    
  // Fetch details of a specific id and load it into the 'updateUser' variable
  
    const handleUpdateUser = async (id) =>{
        try{
          console.log("id iss ", id)
          const response = await axios.get(`http://127.0.0.1:8000/details_user/${id}/`) ;
          if(response.status === 200){
            setUpdateUser(response.data)
            console.log("data is",updateUser)
          }
          
          
          
        }catch(error){
          console.error("Erroooooorrr")
        }
        
    }
  
  // Adding new details to 'updateUser', it is an array variable
  
  const handleInputChangeUser = (e) =>{
    const {name, value} = e.target;
    setUpdateUser({
      ...updateUser,
      [name] : value
    });
  }
  
  // After clicking submit button, insert the value of 'updateUser' to the API
  
  const handleSubmitUser = async (e) =>{
    e.preventDefault();
   
   try{
    const response = await axios.put(`http://127.0.0.1:8000/update_user/${updateUser.id}/`,updateUser);
    if(response.status === 200){
      console.log("Successss")
      toast.success("User updated successfully!");
  
    }
   }catch(error){
    console.log("Moonjii")
   }
   
  }
  
  // Delete function
  
  const handleDeleteUser = async (id) =>{
  
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/delete_user/${id}/`)
      setUser(User.filter(user => user.id !== id));
      
      toast.success("User Deleted successfully!");
     
    }catch(error){
      toast.error("User Deletion failed!! ",error);
      console.log("The error is ",error)
    }
  
  }
  
  // Search
  
  const [searchItem,setSearchItem] = useState('')
  const filterDAta = User.filter((item)=>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
  )
     
  // Paginator
  
  const [currentPage, setcurrentPage] = useState(1)
  
  const recordPerPage = 5
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage
  const records = filterDAta.slice(firstIndex,lastIndex);
  const npage = Math.ceil(User.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  
  function prevPage(){
      if(currentPage !== 1){
          setcurrentPage(currentPage -1)
      }
  }
  function nextPage(){
      if(currentPage !== npage){
          setcurrentPage(currentPage + 1)
      }
  }
  function changePage(id){
      setcurrentPage(id)
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
        <Link to='bookdetails' style={{textDecoration:'none',color:'white'}}><span>Book Details</span></Link>
          
        </li>
        <li class="nav-item">
        <Link to='userdetails' style={{textDecoration:'none',color:'white'}}><span>User Details</span></Link>
        </li>
        <li class="nav-item" >
          <a class="nav-link " href="#item-3" >Dashboard</a>
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
        
        <Link to='/bookdetails' style={{textDecoration:'none',}}><span className='nav-link'>Book Details</span></Link>
        <a className="nav-link sidenav" >User Details</a>

      </nav>
    </nav>
    <div className='logout-btn text-center'>
    <Link to='/dashboard' style={{textDecoration:'none',color:'white'}}><i class="bi bi-pencil-square"></i> Dashboard</Link>
  
    </div>
    <div className='logout-btn text-center '>
     <p><Link to='/' style={{textDecoration:'none',color:'white'}}><i class="bi bi-box-arrow-right"></i> Logout</Link></p> 
    </div>
  </div>


{/* Contents in right side of the NavBar */}

  <div className="col-8 scrollable-content">
    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">

      
    
<div className='container bookcont full-height px-lg-5'>

<h2 className='text-center text1'  data-aos="fade-up" data-aos-delay="300" style={{color:'white'}}><span className='text-warning'>User</span>Details</h2>

{/* Search bar */}

    <input className='form-control p-2 m-2'  data-aos="fade-up" data-aos-delay="300" style={{width:'20%'}} name='email' placeholder='Search' onChange={(e)=>{
          setSearchItem(e.target.value)
          setcurrentPage(1)
          }}></input>

  {/* User Table */}


<div className='table-responsive '  data-aos="fade-up" data-aos-delay="300">

    <table className=" table shadow tw table-responsive table-striped table-succes " style={{backgroundColor: 'transparent'}}>
  <thead style={{backgroundColor: 'transparent'}}>
    <tr style={{backgroundColor: 'transparent'}}>
      <th scope="col" >#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col" >Actions</th>
    </tr>
  </thead>
  <tbody>
    
    {records.map((item, index)=>(

      <tr >
      <th scope="row" key={item}>{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModals" onClick={()=>handleUpdateUser(item.id)}  >Delete</button>&nbsp;
        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleUpdateUser(item.id)}>Update</button>
      </td>
    </tr>

    ))}
    

  </tbody>
</table>
</div>

{/* Paginator */}

<nav aria-label="..."  data-aos="fade-up" data-aos-delay="300">
  <ul class="pagination">
    <li class="page-item ">
    <a class="page-link" onClick={prevPage}>Previous</a>
    </li>
   
    {
            numbers.map((n, i) => (

                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className="page-link" onClick={() => changePage(n)}>
                        {n}
                    </a>
                </li>
              
            ))
        }

    <li class="page-item">
      <a class="page-link" onClick={nextPage}>Next</a>
    </li>
  </ul>
</nav>

{/* User Update Modal */}

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Book "{updateUser.name}"</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmitUser}>
            <label><strong>Name</strong></label>
            <input className='form-control' value={updateUser.name} name='name' onChange={handleInputChangeUser}></input>

            <label><strong>Email</strong></label>
            <input className='form-control' value={updateUser.email} name='email' onChange={handleInputChangeUser}></input>

            <label><strong>Phone</strong></label>
            <input className='form-control' value={updateUser.phone} name='phone' onChange={handleInputChangeUser}></input>

            <button type="button" className="btn btn-secondary m-2"  data-bs-dismiss="modal">Close</button>&nbsp;
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        </form>
      </div>
      
    </div>
  </div>
</div>

{/* User Delete Modal */}

<div className="modal fade" id="exampleModals" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Book "{updateUser.name}" </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Do you wants to delete "{updateUser.name}" ?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> handleDeleteUser(updateUser.id)}>Delete</button>
      </div>
    </div>
  </div>
</div>


</div> 
    
      
    </div>
  </div>
</div>






    </body>
  )
}
