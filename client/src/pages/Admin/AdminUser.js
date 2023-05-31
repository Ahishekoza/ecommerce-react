import React from 'react'
import AdminPanel from '../../components/Layout/AdminPanel'
import Layout from '../../components/Layout/Layout'

const AdminUser = () => {
  return (
    <>
   <Layout title={"Create-User"}>
   <div className="container-fluid">
                <div className='row m-5'>
                    <div className='col-md-3'>
                    {/* Create a Component of containing list-items */}
                    <h4 className='mb-3'>Admin Panel</h4>
                    <AdminPanel/>
                    </div>
                    <div className='col-md-9'>
                    <h1>AdminUsers</h1>
                    </div>
                </div>
        </div>
   </Layout>

    </>
  )
}

export default AdminUser