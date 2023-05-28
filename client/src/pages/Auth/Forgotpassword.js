import React from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Forgotpassword = () => {
    
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const email = event.target.email.value;
        const password = event.target.newPassword.value;
        const answer = event.target.answer.value;

        await axios.put(`${process.env.REACT_APP_API}change-password`,{
            email:email,
            password:password,
            answer:answer
        }).then((response)=>{
            if(response.status === 200) {
                console.log(response.data.message);
                navigate('/login')
            }
        })



    }

  return (
    <Layout>
       <div className='container-fluid '>
        <div className='row' >
          <div className='d-flex justify-content-center align-items-center '  style={{height:"95vh"}}>
            <div className='card text-left my-3' style={{width:"40rem", height:"max-content",padding:"1rem 1rem"}}>
              <div className='card-body'>
                <h4 className='card-title' style={{textTransform:"uppercase"}}>RESET PASSWORD</h4>
                <hr className='my-2'></hr>
                <div>
                <form  onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label">Your answer</label>
                    <input type="text" className="form-control" id="answer"   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newPassword"  />
                  </div>
                  <div className='mb-3 text-center'>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default Forgotpassword