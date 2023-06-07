import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/searchContext'
import ProductCard from '../components/Layout/ProductCard'

const SearchedProduct = () => {

  // eslint-disable-next-line 
    const [values,setValues]=  useSearch()


  return (
    <>
    <Layout title={"Searched Products"}>
        <div className='container'>
            <div className='text-center'>
                <h1>Searched Results</h1>
                <h6>{ values.results.length <1 ? 'No Product Found' : `Found ${values.results.length} Product${values.results.length===1? '':'s'}` }</h6>
            </div>
            <div className='d-flex flex-wrap gap-2'>
            {
              values.results.map((p)=>(
                <ProductCard _id={p._id} name={p.name} description={p.description} price={p.price} slug={p.slug}/>
              ))
            }
            </div>
        </div>
    </Layout>
    </>
  )
}

export default SearchedProduct