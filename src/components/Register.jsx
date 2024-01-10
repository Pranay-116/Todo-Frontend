import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../App'
import { toast } from 'react-hot-toast';
import { Context } from '../main';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${server}/users/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // equivalent to withCredentials: true in axios
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Unexpected Error Occurred!');
      }
  
      const data = await response.json();
      console.log(data);
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  if(isAuthenticated)
  {
    return <Navigate to = {"/"}/>
  }
  
  return (
    <div className='login'>
    <section>
      <form onSubmit={submitHandler} >
        <input  value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required/>
        <input  value={email} onChange={(e) =>setEmail(e.target.value)} type ="text" placeholder="Email" required/>
        <input  value={password} onChange={(e) =>setPassword(e.target.value)} type ="text"  placeholder="Password" required/>
        <button disabled = {loading} type="submit">Sign Up</button>
        <h4>Or</h4>
        <Link to={"/login"}>Log In</Link>
        </form>
    </section>
    
  </div>
  )
}

export default Register
