import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'


const Orders = () => {
  return (
    <Layout title={"User-Orders"}>
       <div className="container-fluid">
      <div className='row m-5'>
        <div className='col-md-3'>
          <UserPanel/>
        </div>
        <div className='col-md-9'>
          User Orders
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Orders