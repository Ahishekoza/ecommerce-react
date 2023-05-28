import React from 'react'
import Layout from '../components/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout>
       <div className='d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
         <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='pnf_letter_bold'>404</h1>
            <h3><span className='mx-2'>OOPS!</span>Page Not Found</h3>
            <button className='pnf_button'>Go Back</button>
         </div>
       </div>
    </Layout>
  )
}

export default PageNotFound