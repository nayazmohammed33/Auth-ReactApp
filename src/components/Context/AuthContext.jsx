import React, { useState } from "react"

export const AuthContext=React.createContext({
    token:null,
    email:null,
    login:(token,name,email)=>{},
    logout:()=>{},
    changePassowrd:(token,password)=>{}
})


export const  AuthProvider =({children})=>{
    const [token,setToken] =useState(null);
    const [email, setEmail] =useState(null);


    const login=(token,email)=>{
        setToken(token);
        setEmail(email);
    
    }

    const logout=()=>{
        setToken(null);
        setEmail(null);
        console.log("Token Cleared")
    }

    return(
        <AuthContext.Provider value={{token,email,login,logout}} >
            {children}
        </AuthContext.Provider>
    )
}

