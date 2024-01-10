import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register"
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main";
export const server ="https://nodejs-todoapp-fhyh.onrender.com/api/v1"
function App() {
  const {setIsAuthenticated,setUser,setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);


  return (
   <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    <Toaster/>
   </Router>
  )
}

export default App
