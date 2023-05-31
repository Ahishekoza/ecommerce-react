import React from 'react'
import Layout from '../../components/Layout/Layout' 
import UserPanel from '../../components/Layout/UserPanel'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [token] = useAuth()
  return (
   <Layout>
     <div className="container-fluid">
      <div className='row m-5'>
        <div className='col-md-3'>
          <UserPanel/>
        </div>
        <div className='col-md-9'>
        <div className='card'>
            <div className='card-body'>
              {
                token?.user 
                &&
                <>
                <p>{token?.user?.name}</p>
                <p>{token.user.email}</p>
                </>
              }
            </div>
          </div>
        </div>
      </div>
     </div>
   </Layout>
  )
}

export default Dashboard