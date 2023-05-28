import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from 'axios'
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";


const PrivateRoute = () =>{
    const [ ok,setOk ] = useState(false)
    // eslint-disable-next-line
    const [ token,setToken ] = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{
            await axios.get(`${process.env.REACT_APP_API}user-auth`).then((resposne)=>{
                if(resposne.data.ok){
                    setOk(true)
                }
            })
        }
        if(token?.token){
            authCheck()
        }
    },[token?.token])

    return ok ? <Outlet/> : <Spinner/>
}

export default PrivateRoute