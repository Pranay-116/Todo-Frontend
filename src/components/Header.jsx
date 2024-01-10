import React from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import { useContext } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { server } from '../App'

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
  const handleLogOut = async() =>{
    setLoading(true);
    try{
      await axios.get(`${server}/users/logout`,{
        withCredentials:true,
      });
      setIsAuthenticated(false);
      toast.success("Logged out Successfully!!");
      setLoading(false);
    }catch(error)
    {
      setIsAuthenticated(true);
      toast.error(`Unexpected Error Occured`);
      setLoading(false);
    }
  }

  return (
   <nav className="header">
    <div>
        <h2>Todo App.</h2>
    </div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
       {
        (isAuthenticated)? ( <button disabled={loading} className='btn' onClick={handleLogOut}>Logout</button>): (<Link to={"/login"}>Login</Link>)
        
        }
      
       
        
     
    </article>
   </nav>
  )
}

export default Header
