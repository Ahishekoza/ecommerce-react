import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {

  const params = useParams()

  const [product , setProduct] = useState({})

  useEffect(() => {
    if(params?.slug) {
      DetailedItems()
    }
    // eslint-disable-next-line
  },[params?.slug])

  const DetailedItems = async() => {
    await axios.get(`${process.env.REACT_APP_API}Single-Product/${params?.slug}`).then((response) =>{
      if(response.data.success) {
        console.log(response.data.product)
        setProduct(response.data.product)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

 

  return (
    <Layout>
      {JSON.stringify(product)}
        ProductDetails
    </Layout>
  )
}

export default ProductDetails