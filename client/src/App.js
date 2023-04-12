import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import UserContext, { AccountContext } from "./components/AccountContext";
import { useContext } from "react";
import { Friends } from "./components/Friends";
import { Conversation } from "./components/Conversation";
import { Conversations } from "./components/Conversations";

function App() {
  return (
    <UserContext>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/convos" element={<Conversations />} />
        <Route path="/conversation/:id" element={<Conversation/>}/>
      </Routes>
    </UserContext>
  );
}

export default App;
