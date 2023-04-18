import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import { useContext, useEffect } from "react";
import { Friends } from "./components/Friends";
import { Conversation } from "./components/Conversation";
import { Conversations } from "./components/Conversations";
import { GlobalContext, GlobalProvider } from "./components/context/GlobalState";
import axios from "axios";
import { Signout } from "./components/Signout";
import { About } from "./components/About";

function App() {
  let {setUser} = useContext(GlobalContext)
  
  
  useEffect(()=>{
    
  setUser()
  },[])
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/convos" element={<Conversations />} />
        <Route path="/conversation/:id" element={<Conversation />} />
        <Route path="/signout" element={<Signout/>}/>
      </Routes>
    
  );
}

export default App;
