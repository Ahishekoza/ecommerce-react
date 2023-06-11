import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import CategoriesHook from '../components/hooks.js/CategoriesHook'
import axios from 'axios'
import ProductCard from '../components/Layout/ProductCard'

const Categories = () => {

    const categories = CategoriesHook()

    const [products, setProducts] = useState([])

    const handleCategories = async(categoryId)=>{
        console.log(categoryId)

        await axios.get(`${process.env.REACT_APP_API}category-based-products/${categoryId}`).then((response)=>{
            if(response.data.success) {
                console.log(response.data.products)
                setProducts(response.data.products)
            }
        }).catch((error)=>{
            console.log(error)
        })

       
    }

  return (
    <Layout>
        <div className='container my-2'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='d-flex flex-wrap  align-items-center justify-content-center mt-2'>
                    {
                        categories?.map((c)=>(
                           <button className='btn btn-outline-secondary my-2 mx-2' onClick={()=>{handleCategories(c._id)}}>{c.name}</button> 
                        ))
                    }
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='row'>
                <div className='col-md-12 '>
                    <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
                        {
                            products.map((p)=>(
                                <ProductCard _id={p._id} name={p.name} description={p.description} price={p.price} slug={p.slug} p={p}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Categories