import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminPanel from '../../components/Layout/AdminPanel'

export const CreateProduct = () => {
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
                    </div>
                </div>
        </div>

    </Layout>
  )
}
