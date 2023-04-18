import React, {createContext, useEffect, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const initialState = {
    user: {
        id: null
    }
}



export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) =>{
    let navigate = useNavigate()
    const [state, dispatch] = useReducer(AppReducer, initialState);

   async function setUser(){
    let token = JSON.parse(localStorage.getItem("token"))
    if(!token){
        return 
    }
    let {data} = await axios.get("/api/user/profile", {
        headers: {
            "auth-token": token.token
        }
    })
        dispatch({
            type: "SET_USER",
            payload: data
        })
    }

    const verifyToken = async(role) =>{
        try {
            let token = JSON.parse(localStorage.getItem("token"))
            if(token.role != role){
                localStorage.removeItem("token")
                return navigate("/login")
            }
            let {data} = await axios.get("/api/auth", {
                headers: {
                    "auth-token": token.token
                }
            })
            if(data.role != role){
                localStorage.removeItem("token");
                return navigate("/login")
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            return navigate("/login")
        }
    }
useEffect(()=>{
    
    
},[])
    return (
        <GlobalContext.Provider value={{
            user: state.user,
            setUser,
            verifyToken
        }}>
            {children}
        </GlobalContext.Provider>
    )
}