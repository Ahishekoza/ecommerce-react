import { useState, useContext, createContext, useEffect,  } from "react";
import axios from "axios";
const AuthContext = createContext()

const AuthContextProvider = (props) =>{
    const [token,setToken] = useState({
        token:'',
        user: null
    })

    axios.defaults.headers.common['Authorization'] = token?.token
    
    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            // Parse the data as we need to display it in Json format
            const parsedData = JSON.parse(data)
            setToken({
                ...token,
                user: parsedData.user,
                token: parsedData.token
            })
        }
        // eslint-disable-next-line 
    }, [])

    return (
        <AuthContext.Provider value={[token,setToken]}>{props.children}</AuthContext.Provider>
    )

}


const useAuth = ()=> useContext(AuthContext)

export {
    useAuth,
    AuthContextProvider

}