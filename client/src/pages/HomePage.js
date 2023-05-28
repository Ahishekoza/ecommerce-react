import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  
  const [token , setToken] = useAuth()

  return (
    

    <Layout title={"E-commerce Home"} description={""}>
        <h4>HomePage</h4>
        <pre>{JSON.stringify(token)}</pre>
    </Layout>

  )
}


export default HomePage