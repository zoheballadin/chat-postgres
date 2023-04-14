import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import UserContext, { AccountContext } from "./components/AccountContext";
import { useContext, useEffect } from "react";
import { Friends } from "./components/Friends";
import { Conversation } from "./components/Conversation";
import { Conversations } from "./components/Conversations";
import { GlobalContext, GlobalProvider } from "./components/context/GlobalState";
import axios from "axios";

function App() {
  let {setUser} = useContext(GlobalContext)
  
  
  useEffect(()=>{
    
  setUser()
  },[])
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/convos" element={<Conversations />} />
        <Route path="/conversation/:id" element={<Conversation />} />
      </Routes>
    
  );
}

export default App;
