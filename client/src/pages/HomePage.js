import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Checkbox ,Radio}  from 'antd'
import { Prices } from '../components/Prices'
import axios from 'axios'

const HomePage = () => {
  // eslint-disable-next-line 
  const navigate = useNavigate()

  // ---Categories
  const [ categories , setCategories ] = useState([])
  // ---Products
  const [ products,setProducts] = useState([])
  // ---checked
  const [checked ,setChecked] = useState([])
  // ---radio
  const [ radio, setRadio]= useState({})

  // ---products Count
  const [count ,setCount] = useState(0)

  // --- page 
  const [page, setPage] = useState(1)

  // ---loading
  const [loading, setLoading] = useState(false)

  const getAllCategories = async() =>{
    await axios.get(`${process.env.REACT_APP_API}All-Categories`).then((response)=>{
      if(response.data.success){
        setCategories(response.data.categories)
        console.log(response.data.categories)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  
  const getAllProducts = async() =>{
    setLoading(true)
    
    await axios.get(`${process.env.REACT_APP_API}product-per-page/${page}`).then((response)=>{
    
      setLoading(false)
      if(response.data.success){
        setProducts(response.data.products)
        console.log(response.data.products)
      }
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })

  }

  const handleFilter = (value,Id) =>{
    let all =[...checked]
    // --while adding the category
    if(value) {
      all.push(Id)
    }
    // while removing the category
    else{
      all=all.filter((c)=> c!==Id)
    }

    setChecked(all)
  }


  // ----filters
  const filterProduct = async()=>{
    await axios.post(`${process.env.REACT_APP_API}product-filters`,{checked,radio}).then((response)=>{
      if(response.data.success){
        setProducts(response.data.products)
      }
    }).catch((error) => {
      console.log(error)
    })
  }


  // ---products Count
  const ProductsCount =async( )=>{
    await axios.get(`${process.env.REACT_APP_API}product-count`).then((products)=>{
      if(products.data.success){
        setCount(products.data.productCount)
      }
    })
  }

  const handleLoadingPages=(e)=>{
    e.preventDefault()
    setPage( page + 1)
  }

  const loadMore = async()=>{
    setLoading(true)
    await axios.get(`${process.env.REACT_APP_API}product-per-page/${page}`).then((response)=>{
    
      setLoading(false)
      if(response.data.success){
        setProducts([...products,...response.data.products])
        console.log(response.data.products)
      }
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })

  }

  // ---Handle Details
  const handleDetails = (slug)=>{

  }

  useEffect(()=>{
    getAllCategories()

    // --- converting the existing function in to product-list function to obtain pagination
    getAllProducts()

    // --products count
    ProductsCount()

    if(checked.length>0 || radio.length){
      filterProduct()
    }

    if(page===1) return
    loadMore()
  // eslint-disable-next-line
  },[checked, radio,page])


  

  return (
    

    <Layout title={"E-commerce Home"} description={""}>
       <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <h2 className='my-2'>
            Filter By Category
            </h2>

            <div className='d-flex flex-column'>
              {
                categories.map((c)=>(
                  <Checkbox
                  key={c._id}
                  onChange={(e)=>{handleFilter(e.target.checked, c._id)}}
                  >{c.name}</Checkbox>
                ))
              }
            </div>

            {/* Filter based on Price */}
            <h2 className='my-2'>
            Filter By Prices
            </h2>

              <Radio.Group onChange={(e)=>{setRadio(e.target.value)}}>
              
                <div className='d-flex flex-column '>
                 {
                   Prices?.map((p)=>(
                    <Radio
                    key={p._id}
                    value={p.array}
                    >{p.name}</Radio>
                  ))
                 }
                </div> 
              </Radio.Group>

             <div className='mt-2'>
              <button className='btn btn-danger' onClick={()=>{window.location.reload()}}>RESET FILTER</button>
             </div>

          </div>
          <div className='col-md-9'>
            
            <h1 className='text-center'>All Products</h1>
            <div className='d-flex flex-wrap gap-2'>
            {
              products.map((p)=>(
                <div className='card ' style={{width:'18rem'}} key={p._id}>
              <img src={`${process.env.REACT_APP_API}get-photo/${p._id}`} alt={p.name} className='card-img-top'></img>
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>{p.description}</p>
                <p className='card-text'>$ {p.price}</p>
                <div className='d-flex'>
                <button className='btn btn-primary ms-2'>Add To Cart</button>
                <button className='btn btn-secondary ms-2' onClick={handleDetails(p.slug)}>Know More</button>
                </div>
              </div>
            </div>
              ))
            }
            </div>

           <div className='my-2'>
            {/* once my product lenth gets equal to count my button will get disappear */}
            {products && products.length < count && (
              <button className='btn btn-warning' onClick={handleLoadingPages}>
                {loading ? 'Loading...' : ' LoadMore'}
              </button>
            )}
           </div>

          </div>
        </div>
       </div>
    </Layout>

  )
}


export default HomePage