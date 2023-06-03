import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// -----
import {Select} from 'antd'
const { Option } = Select;



export const CreateProduct = () => {

  const navigate = useNavigate()

  const [categories , setCategories] =  useState([])

  // --- we can also  create the classs but we have to store the values so we are creating states
  const [photo ,setPhoto] = useState("")

  // ---
  const [category,setCategory] = useState("")

  // ----
  const [name, setName] = useState("")
  // ---
  const [description, setDescription] = useState("")

  // ---
  const [price, setPrice] = useState("")

  // ---
  const [ quantity, setQuantity] = useState("")

  // ---
  const [ shippingAddress, setShippingAddress] = useState("")

  var binaryData = [];
binaryData.push(photo);


  const getAllCategories = async() =>{

    await axios.get(`${process.env.REACT_APP_API}All-Categories`)
    .then((response)=>{
      if(response.data.success){
        console.log(response.data.categories)
        setCategories(response.data.categories)
      }
    })
    .catch((error)=>{
      console.log(error.message)
    })
  }

  
  const handleSubmit = async()=>{

    const productData =  new FormData()
    productData.append('name',name)
    productData.append('description',description)
    productData.append('price',price)
    productData.append('quantity',quantity)
    productData.append('shippingAddress', shippingAddress)
    productData.append('category',category)
    productData.append('photo',photo)

    await axios.post(`${process.env.REACT_APP_API}admin/Add-products`,productData).then((response)=>{
      if(response.data.success){
        console.log(response.data.Product)
        navigate('/dashboard/admin/products')
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  useEffect(()=>{
    getAllCategories()
  },[])

  return (
    <Layout title={"Create-Product"}>
        <div className="container-fluid">
                <div className='row m-5'>
                    <div className='col-md-3'>
                    {/* Create a Component of containing list-items */}
                    <h4 className='mb-3'>Admin Panel</h4>
                    <AdminPanel/>
                    </div>
                    <div className='col-md-9'>
                    <h1>Create product</h1>
                    <div className='m-1 w-75'>
                      <Select
                      placeholder="Select a Category"
                      showSearch
                      size='large'
                      className='form-select'
                      onChange={(value)=>{
                        setCategory(value);
                      }}
                      >
                        {
                        categories.map((c)=>(
                          <Option key={c._id} value={c._id} >{c.name}</Option>
                        ))
                        }
                      </Select>

                    <div className='mt-3 '>
                      <label  className='btn btn-outline-secondary w-100'>{ photo? photo.name : "Upload Photos"}
                      <input type='file' name='photo' accept='image/*' hidden onChange={(e)=>{
                        
                        setPhoto(e.target.files[0])
                      }}></input></label>
                    </div>

                    <div className='text-center mt-2'>
                      <img src={window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))} alt='Upload Images' className='img img-responsive'></img>
                    </div>

                    <div className='mt-3'>
                      <input type='text'
                      className='form-control'
                      placeholder='Enter Product Name'
                      value={name} 
                      name="name" onChange={(e)=>{
                        setName(e.target.value)
                      }}></input>
                    </div>

                    <div className='mt-3'>
                      <textarea type='text'
                      className='form-control'
                      placeholder='Enter Your Description'
                      value={description} 
                      name="description" 
                      onChange={(e)=>{
                        setDescription(e.target.value)
                      }}></textarea>
                    </div>

                    <div className='mt-3'>
                      <input type='number'
                      className='form-control'
                      placeholder='Enter Price'
                      value={price}  
                      name="price" onChange={(e)=>{
                        setPrice(e.target.value)
                      }}></input>
                    </div>

                    <div className='mt-3'>
                      <input type='number'
                      className='form-control'
                      placeholder='Enter Quantity'
                      value={quantity}  
                      name="quantity" 
                      onChange={(e)=>{
                        setQuantity(e.target.value)
                      }}></input>
                    </div>

                    <div className='mt-3'>
                      <Select 
                      bordered={false}
                      placeholder="Shipping Address"
                      size='large'
                      className='form-control'
                      onChange={(value)=>{
                        setShippingAddress(value)
                      }}
                      >
                        <Option value="0">NO</Option>
                        <Option value="1">YES</Option>
                      </Select>
                    </div>

                    <div className='mt-3'>
                      <button className='btn btn-primary' onClick={handleSubmit}>CREATE PRODUCT</button>
                    </div>

                    </div>

                    </div>
                </div>
        </div>

    </Layout>
  )
}
