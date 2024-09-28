import React, { useEffect, useState } from 'react'
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import axios from 'axios'
import { toast } from 'react-toastify';


export default function BookDetails() {

    const [Book,setBook] = useState([])
    const [updateBook, setUpdateBook] = useState({}) 
  
  // fetch Book details to Book
  
    const fetchBook = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/book_create/') ;
        setBook(response.data)
      }catch(error){
        console.log("Errorr indd")
      }
    }
  
    useEffect(()=>{
      AOS.init({
        duration: 1200, 
       
      });
      fetchBook();
      
    },[Book,updateBook]);
    
  // Fetch details of a specific id and load it into the 'updateBook' variable
  
    const handleUpdate = async (id) =>{



        try{
          console.log("id iss ", id)
          const response = await axios.get(`http://127.0.0.1:8000/book_details/${id}/`) ;
          if(response.status === 200){
            setUpdateBook(response.data)
            console.log("data",response.data)
          }
          
          
          
        }catch(error){
          console.error("Erroooooorrr")
        }
        
    }
  
  // Adding new details to 'updateBook', it is an array variable
  
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setUpdateBook({
      ...updateBook,
      [name] : value
    });
  }

// Image functions


const handleInputImage = (e) => {
  const file = e.target.files[0]
  setUpdateBook({
      ...updateBook,
      image: file
  });
};

  
  // After clicking submit button, insert the value of 'updateBook' to the API
  
  const handleSubmit = async (e) =>{
    e.preventDefault();


    const formDAtaImage = new FormData()
    formDAtaImage.append("title",updateBook.title)
    formDAtaImage.append("author",updateBook.author)
    formDAtaImage.append("year",updateBook.year)
    formDAtaImage.append("image",updateBook.image)

   
   try{
    const response = await axios.put(`http://127.0.0.1:8000/book_update/${updateBook.id}/`,formDAtaImage);
    if(response.status === 200){
      console.log("Successss")
      toast.success("Book updated successfully!");
  
    }
   }catch(error){
    console.log("Moonjii")
   }
   
  }
  
  // Delete function
  
  const handleDelete = async (id) =>{
  
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/book_delete/${id}/`)
      setBook(Book.filter(book => book.id !== id));
      
      toast.success("Book Deleted successfully!");
     
    }catch(error){
      toast.error("Book Deletion failed!! ",error);
      console.log("The error is ",error)
    }
  
  }
  
  // Search
  
  const [searchItem,setSearchItem] = useState('')
  const filterDAta = Book.filter((item)=>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
  )
     
  // Paginator
  
  const [currentPage, setcurrentPage] = useState(1)
  
  const recordPerPage = 3
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage
  const records = filterDAta.slice(firstIndex,lastIndex);
  const npage = Math.ceil(Book.length / recordPerPage)
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
    <>
    
 
    
<div className='container  full-height px-lg-5'style={{top:0}} >

<h2 className='text-center text1' style={{color:'white'}}><span className='text-primary'>Book</span>Details</h2>

{/* Search bar */}
<div className='container'> 
<input className='form-control p-2 m-2' style={{width:'20%',}} name='email' placeholder='Search' onChange={(e)=>{
          setSearchItem(e.target.value)
          setcurrentPage(1)
          }}></input>

</div>
  

  {/* Book Table */}
{/* 
    <table className="  shadow table table-striped table-succes  " style={{height:'60vh',width:'100%'}} data-aos="fade-up" data-aos-delay="300">
  <thead style={{backgroundColor: 'green'}}>
    <tr style={{backgroundColor: 'transparent'}}>
      <th scope="col" >#</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Year</th>
      <th scope="col" >Actions</th>
    </tr>
  </thead>
  <tbody>
    
    {records.map((item, index)=>(

      <tr >
      <th scope="row" key={item}>{index + 1}</th>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.year}</td>
      <td>
        <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModals" onClick={()=>handleUpdate(item.id)}  >Delete</button>&nbsp;
        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleUpdate(item.id)}>Update</button>
      </td>
    </tr>

    ))}
    

  </tbody>
</table> */}


{/* Cards */}


<div class="row row-cols-1 row-cols-md-3 g-4">

{records.map((item, index)=>(

  <div class="col">
    <div class="card h-100" data-aos="fade-up" data-aos-delay={200 + (index * 200) }>
      <img src={item.image} class="card-img-top" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title" style={{fontWeight:'bold'}}><h3>{item.title}</h3></h5>
        <p class="card-text">Author : {item.author}</p>
        <p class="card-text">Year of publication : {item.year}</p>

      </div>
    </div>
  </div>

  ))}

</div>


{/* Paginator */}

<nav aria-label="...">
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

{/* Book Update Modal */}

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Book "{updateBook.title}"</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
            <label><strong>Name</strong></label>
            <input className='form-control' value={updateBook.title} name='title' onChange={handleInputChange}></input>

            <label><strong>Email</strong></label>
            <input className='form-control' value={updateBook.author} name='author' onChange={handleInputChange}></input>

            <label><strong>Phone</strong></label>
            <input className='form-control' value={updateBook.year} name='year' onChange={handleInputChange}></input>

            
            <label for="formFile" class="form-label">Upload Image</label>
            <input class="form-control" type="file" id="formFile" name='image' accept='image/*' style={{backgroundColor:'transparent',color:'white'}} onChange={handleInputImage} ></input>
                          

            <button type="button" className="btn btn-secondary m-2"  data-bs-dismiss="modal">Close</button>&nbsp;
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        </form>
      </div>
      
    </div>
  </div>
</div>

{/* Book Delete Modal */}

<div className="modal fade" id="exampleModals" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Book "{updateBook.title}" </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Do you wants to delete "{updateBook.title}" ?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> handleDelete(updateBook.id)}>Delete</button>
      </div>
    </div>
  </div>
</div>


</div> 
    
    
    
    
    
    </>
  )
}
