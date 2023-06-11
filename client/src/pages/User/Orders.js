import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'
import { useAuth } from '../../context/auth'
import { useState,useEffect } from 'react'
import axios from 'axios'


const Orders = () => {

  // eslint-disable-next-line
  const [token , setToken] = useAuth()

  // eslint-disable-next-line
  const [orders , setOrders] = useState([])
  
  const getOrders = async()=>{
   
    await axios.get(`${process.env.REACT_APP_API}orders`).then((response)=>{
      if(response.data.success){
        setOrders(response.data.orders)
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  useEffect(() =>{
    if(token?.token){
      getOrders()
    }
  },[token?.token])

  return (
    <Layout title={"User-Orders"}>
       <div className="container-fluid">
      <div className='row m-5'>
        <div className='col-md-3'>
          <UserPanel/>
        </div>
        <div className='col-md-9'>
          User Orders
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Orders