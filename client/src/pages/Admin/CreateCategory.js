import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'
import axios from 'axios'
import { useEffect,useState } from 'react'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {

  const [ categories , setcategories ] = useState([])

  const [ name , setName] = useState('')

  // Use to visible and disable Modal

  const [ visible , setVisible ] = useState(false)

  // -----Keep the data of selected category -----
  const [ selected , setSelected ] = useState(null)

  // ---Keep the track of updation on selected category -----
  const [updatedValue , selectUpdatedValue ] = useState('')



  // This submit is present in CategoryForm
  const handleSubmit = async (event) =>{
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API}admin/create-category`,{name:name}).then((response)=>{
      if(response.data.sucsess){
        console.log(response.data.success);
        // This will make Name empty so that we will get our input bar cleared

        // This will give us new category added to the list 
        getAllCategories()
      }
    }).catch((error) =>{
      console.log(error.message);
    })

  }

  const getAllCategories = async() => {
    await axios.get(`${process.env.REACT_APP_API}All-Categories`).then((response)=>{

      if(response.data.categories){
        setcategories(response.data.categories)
        
      }
  }).catch((error) => {
      console.log(error)
  })
  }


  // Handle Update Values
  const handleUpdate = async(event)=>{
    event.preventDefault()

    await axios.put(`${process.env.REACT_APP_API}admin/update-category/${selected._id}`, {name:updatedValue}).then((response)=>{
      console.log(response.data)
      if(response.data.success){
        getAllCategories()
        setVisible(false)
      }
    }).catch((error) => {
      console.log(error.message)
    });
  }

  //  Delete Category
  const handleDelete = async(Id)=>{
    console.log(Id)
    await axios.delete(`${process.env.REACT_APP_API}admin/deleteCategory/${Id}`).then((response) => {
      if(response.data.success){
        console.log(response.data.message)
        getAllCategories()
      }
    }).catch((error) => {
      console.log(error.message)
    });

  }

  useEffect(()=>{
    getAllCategories() 

  },[])


  return (
    <Layout title={"Create-Category"}>

        <div className="container-fluid">
                <div className='row m-5'>
                    <div className='col-md-3'>
                    {/* Create a Component of containing list-items */}
                     <h4 className='mb-3'>Admin Panel</h4>
                    <AdminPanel/>
                    </div>
                    <div className='col-md-9'>
                     <h1>Manage Category</h1>

                    <CategoryForm 
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                    />

                     <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>

                    {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={()=> {
                              setVisible(true); 
                              selectUpdatedValue(c.name);
                              setSelected(c)}}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={()=>{handleDelete(c._id)}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      </>
                    ))}

                    </tbody>
                  </table>

                    </div>
                    <Modal
                    onCancel={()=>setVisible(false)} 
                    open={visible}
                    footer={null} >
                      
                      <CategoryForm value={updatedValue} setValue={selectUpdatedValue} handleSubmit={handleUpdate}/>

                    </Modal>
                </div>
        </div>

        
    </Layout>
  )
}

export default CreateCategory