import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'


// @TODO a normal user with role can access the admin dashboard functionality that we had passed is not wroking currently
const Adminroute = () => {
  
    const [ok,setOk] = useState(false)
    // eslint-disable-next-line
    const [token,setToken] = useAuth()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
       const authCheck = async () => 
       {
        await axios.get(`${process.env.REACT_APP_API}admin-auth`).then((response)=>{
            if(response.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
           
        }) 
       }

        if(token?.token) {
            authCheck()
        } 

    },[token?.token])


    return ok ? <Outlet/> : <Spinner path=""/>

}

export default Adminroute