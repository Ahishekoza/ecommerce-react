
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'

const Products = () => {

  const [products , setProducts] = useState([])

  const getAllProducts = async() =>{
    await axios.get(`${process.env.REACT_APP_API}All-Products`).then((response)=>{
      if(response.data.success){
        console.log(response.data.products)

        setProducts(response.data.products)
      }
  }).catch((error) => {
    console.log(error)
  })
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  return (
    <>

   <Layout>Products</Layout>

    </>
  )
}

export default Products