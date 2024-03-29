import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import { createContext } from 'react'
import { useState } from 'react'

export const Context = createContext();

const AppWrapper = () =>{
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState({})
  return (
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,loading,setLoading,user,setUser}}>
      <App/>
    </Context.Provider>
  )  
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>,
)
