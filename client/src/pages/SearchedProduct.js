import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/searchContext'
const SearchedProduct = () => {

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
                <div className='card ' style={{width:'18rem'}} key={p._id}>
              <img src={`${process.env.REACT_APP_API}get-photo/${p._id}`} alt={p.name} className='card-img-top'></img>
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>{p.description}</p>
                <p className='card-text'>$ {p.price}</p>
                <div className='d-flex'>
                <button className='btn btn-primary ms-2'>Add To Cart</button>
                <button className='btn btn-secondary ms-2' >Know More</button>
                </div>
              </div>
            </div>
              ))
            }
            </div>
        </div>
    </Layout>
    </>
  )
}

export default SearchedProduct