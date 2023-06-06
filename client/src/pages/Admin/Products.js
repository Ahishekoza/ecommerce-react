
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import AdminPanel from '../../components/Layout/AdminPanel'
import { Link } from 'react-router-dom'

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

   <Layout title="E-commerce Products">
    <div className='container-fluid'>
      <div className='row mt-3'>
        <div className='col-md-3'>
        <h4 className='mb-3'>Admin Panel</h4>
          <AdminPanel/>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>

         <div className='d-flex flex-wrap gap-2'>
         {
          products.map((p) => (
            
            <Link to={`/dashboard/admin/update-product/${p.slug}`} className='product-update-link'>
            <div className='card' style={{width:'15rem'}} key={p._id}>
              <img src={`${process.env.REACT_APP_API}get-photo/${p._id}`} alt={p.name} className='card-img-top'></img>
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>{p.description}</p>
              </div>
            </div>
            </Link>

          ))}
         </div>

        </div>
      </div>
    </div>
   </Layout>

    </>
  )
}

export default Products