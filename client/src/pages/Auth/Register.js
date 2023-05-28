import React from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const name = event.target.Name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const phone = event.target.phone.value
    const address = event.target.address.value
    const answer = event.target.answer.value

    console.log(password, phone, address, answer,email,name)

    try {
      
      await axios.post(`${process.env.REACT_APP_API}register`,{
        name:name,
        email:email,
        password:password,
        phone:phone,
        address:address,
        answer:answer
      }).then((response)=>{
        console.log(response)
        if(response.data.success === true){
          navigate('/login')
        }
      }).catch((error)=>{
        console.log("Unable to create user: " + error.message)
      })

    } catch (error) {
      console.log(error)
    }
 
    

  }

  return (
    <Layout title={"Register Page"}>
      <div className='container-fluid '>
        <div className='row' >
          <div className='d-flex justify-content-center align-items-center '  style={{height:"95vh"}}>
            <div className='card text-left my-3' style={{width:"40rem", height:"max-content",padding:"1rem 1rem"}}>
              <div className='card-body'>
                <h4 className='card-title' style={{textTransform:"uppercase"}}>Register Form</h4>
                <hr className='my-2'></hr>
                <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="Name" className="form-label">UserName</label>
                      <input type="text" className="form-control" id="Name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone"  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address"  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label">Answer</label>
                    <input type="text" className="form-control" id="answer"  />
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-primary mx-2">Reset</button>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register