import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({children}) =>{
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({loggedIn: null});

    let auth = async( ) =>{
        try {
            let {data} = await axios.get("/api/auth/login", {withCredentials: true})
            setCurrentUser({...data})
            console.log(data)
        } catch (error) {
            console.log(error)
            setCurrentUser({loggedIn: false})
            return
        }
    }
    useEffect(()=>{
        // auth()
    },[])

    return <AccountContext.Provider value={{currentUser, setCurrentUser}}>{children}</AccountContext.Provider>
}

export default UserContext