import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserPanel from '../../components/Layout/UserPanel'

const Profile = () => {
  return (
    <Layout title={"User-Profile"}>
       <div className="container-fluid">
      <div className='row m-5'>
        <div className='col-md-3'>
          <UserPanel/>
        </div>
        <div className='col-md-9'>
          User Profile
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Profile