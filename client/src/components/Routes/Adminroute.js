import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

const Adminroute = () => {
  
    const [ok,setOk] = useState(false)
    const [token,setToken] = useAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
       const authCheck = async () => 
       {
        await axios.get(`${process.env.REACT_APP_API}admin-auth`).then((response)=>{
            if(response.data.ok){
                setOk(true)
            }
           
        }) 
       }

        if(token?.token) {
            authCheck()
        } 

    },[token?.token])


    return ok ? <Outlet/> : <Spinner/>

}

export default Adminroute