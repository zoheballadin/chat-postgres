import React, {createContext, useEffect, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";



const initialState = {
    user: {
        id: null
    }
}



export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) =>{
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
useEffect(()=>{
    
    
},[])
    return (
        <GlobalContext.Provider value={{
            user: state.user,
            setUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}