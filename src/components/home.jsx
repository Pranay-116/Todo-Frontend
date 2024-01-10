import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
import { server } from "../App";
import toast from "react-hot-toast";
import TodoItem from "./TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading1,setLoading1] = useState(false);
  const [task,setTask] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);
  const submitHandler = async(e) =>{
    e.preventDefault();
    setLoading1(true);
    try{
    const {data} = await axios.post(`${server}/task/new`,

    {
      title,
      description,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    setLoading1(false);
    setTitle("");
    setDescription("");
    console.log(data.message);
    setRefresh((prev) => !prev);
    toast.success(data.message);
  }
  catch(error)
  {
    setLoading1(false);
    setTitle("");
    setDescription("");
    toast.error(error.response.data.message);

    console.log(error);
  }
}
useEffect(() => {
  axios.get(`${server}/task/myTasks`,{
    withCredentials:true,
  }).then((response)=>{
    setTask(response.data.tasks);
    console.log(response);
    toast.success('Loaded Succesfully');
  }).catch((e)=>{
    toast.error(e.response.data.message);
  })

}, [refresh])

if(!isAuthenticated)
{
  return <Navigate to ={'/login'}/>
}

const updateHandler = async (id) =>{
  try{
   const {data} = await axios.put(`${server}/task/${id}`,{},{
    withCredentials:true,
  })
  toast.success('Task Updated Successfully');
  setRefresh((prev) => !prev);
}
catch(error){
  toast.error(error.response.data.message);
}


}
const deleteHandler = async(id) =>{
  try{
    const {data} = await axios.delete(`${server}/task/${id}`,{
     withCredentials:true,
   })
   toast.success('Task deleted Successfully');
   setRefresh((prev) => !prev);
 }
 catch(error){
   toast.error(error.response.data.message);
 }

}

  return (
    
<div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading1} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {task.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
           
          />
        ))}
      </section>
</div>

  )
   
  

};

export default Home;
