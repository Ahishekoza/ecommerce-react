import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/Layout/ProductCard'

const ProductDetails = () => {

  const params = useParams()


  console.log(params?.slug)

  const [product , setProduct] = useState({})

  const [relatedProducts,setRelatedProducts] = useState([])

  useEffect(() => {
    if(params?.slug) {
      DetailedItems()
    }


    getSimilarProducts(product?._id,product?.category?._id)
    // eslint-disable-next-line
  },[params?.slug, product?._id, product?.category?._id])

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

  const getSimilarProducts = async(pId,cId) => {
    await axios.get(`${process.env.REACT_APP_API}related-products/${pId}/${cId}`).then((response) =>{
      if(response.data.success) {
        console.log(response.data.relatedProducts)
        setRelatedProducts(response.data?.relatedProducts)
      }
    })
  }

 

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img src={`${process.env.REACT_APP_API}get-photo/${product._id}`} className='card-img-top mt-5'  style={{height:"500px", width:"500px"}}/>
          </div>
          <div className='col-md-6 mt-2'>
            <h1>Product-Details</h1>
            
              <h6>Name: {product.name}</h6>
              <h6>Description: {product.description}</h6>
              <h6>Price : {product.price}</h6>
              <h6>Category: {product?.category?.name}</h6>
              <h6>shippingAddress : {product?.shippingAddress ? 'Yes' : 'No'}</h6>

          </div>
         <div className='my-5'>
           <h2 className='text-center'>Similar Products</h2>
          {
            relatedProducts.map((p)=>(
              <ProductCard _id={p._id} name={p.name} description={p.description} price={p.price} width={"18rem"} slug={p.slug}/>
            ))
          }
         </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails