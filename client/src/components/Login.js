import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from './AccountContext'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './context/GlobalState'
import { Navbar } from './Navbar'

export const Login = () => {
  const navigate = useNavigate()
    let [user, setLoginUser] = useState({})
    const {setUser} = useContext(GlobalContext)
    const onChange = e => setLoginUser({...user, [e.target.name]: e.target.value})

    const onSubmit = async() =>{
        // return console.log(user)
        try {
            let {data} = await axios.post("/api/auth/login", user, {withCredentials: true})
            setUser()
            alert(data.message)
            localStorage.setItem("token", JSON.stringify({
                token: data.token,
                role: data.role
            }))
            navigate("/convos")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(token){
            token = JSON.parse(token)
            if(token.role == "user"){
                return navigate("/convos")
            }
            else {
                localStorage.removeItem("token");
                return navigate("/login")
            }
        }
    },[])
  return (
    <div className='bg-[#789ddd] h-screen '>
    <Navbar/>
<body class = " bg-purple-800 dark:bg-[#0F172A] -my-24">
    <div class = "bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute ">
        <div id="myDIV " className='bg-purple-800' >
            <div class = "w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
                <div class = "w-full sm:w-1/2 lg:2/3 px-6 bg-purple-800  bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg">
                    <div class = "w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
                        Login
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-xs font-medium text-white">Your email</label>
                        <input type="email" id="email" name='email' onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@neurolink.com" required/>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-xs font-medium text-white">Your password</label>
                        <input type="password" id="password" name='password' onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                    
                    <div class = "flex flex-row justify-between">
                        {/* <div class = "text-white text-sm md:text-md ">Forgot Password</div> */}
                        <div class = "text-[#00FF00] text-sm md:text-md">Signup</div>
                    </div>
                    <div onClick={onSubmit} class = "mt-4 cursor-pointer md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md">
                        Login
                    </div>
        
                </div>
            </div>
        </div>
    </div>
</body>
    
 </div>
    
  )
}
