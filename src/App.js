
import UserDetail from './Components/UserDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import CreateUser from './Components/CreateUser';
import Scrollspy from './Components/Scrollspy';
import BookDetails from './Components/BookDetails';
import CreateBook from './Components/CreateBook';
import Trial from'./Components/Trial'
import Register from './Components/Credentials/Register';
import Login from './Components/Credentials/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UD from "./Components/UD"
import BD from "./Components/BD"








function App() {
  return (
<>
{/* <CreateBook/> */}
{/* <BookDetails/> */}
{/* <Scrollspy/> */}
{/* <UserDetail/> */}
{/* <CreateUser/> */}
<ToastContainer />
{/* <Trial/> */}
{/* <Register/> */}
{/* <Login/> */}



<Router>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='register/' element={<Register/>}></Route>
    <Route path='dashboard/' element={<Scrollspy/>}></Route>
    <Route path='userdetails/' element={<UD/>}></Route>
    <Route path='bookdetails/' element={<BD/>}></Route>
  </Routes>
</Router>



</>
  );
}

export default App;
