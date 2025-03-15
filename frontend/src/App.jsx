import Login from "./login/Login.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routers } from "react-router-dom";

function App() {
 

  return (
    <>
    <div className="p-2 w-screen h-screen flex items-center justify-center">
       <Routes>
        <route path="/login" element={ <Login/> }/>
        <route path="/register" element={ <Register/> }/>
       </Routes>

        
        <toastContainer/>

      </div>    
  
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  
    </>
  )
}

export default App
