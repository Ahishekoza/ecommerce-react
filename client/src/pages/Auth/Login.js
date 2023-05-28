import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth }  from '../../context/auth'
 

const Login = () => {

  const [token,setToken] = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event)=>{
     event.preventDefault()

     const email = event.target.email.value
     const password = event.target.password.value

     

     await axios.post(`${process.env.REACT_APP_API}login`,{
      email,
      password,
     }).then((response)=>{
      
      console.log("Logined In Successfully")

      setToken({
        ...token,
        token: response.data.token,
        user: response.data.user
      })

      localStorage.setItem('auth' , JSON.stringify(response.data))

      navigate('/')
      
     }).catch((error)=>{
      console.log(error)
     })
  }

  return (
    <Layout title="E-commerce Login"> 
         <div className='container-fluid '>
        <div className='row' >
          <div className='d-flex justify-content-center align-items-center '  style={{height:"95vh"}}>
            <div className='card text-left my-3' style={{width:"40rem", height:"max-content",padding:"1rem 1rem"}}>
              <div className='card-body'>
                <h4 className='card-title' style={{textTransform:"uppercase"}}>Login</h4>
                <hr className='my-2'></hr>
                <div>
                <form  onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  />
                  </div>
                  <div className='mb-3 text-center'>
                  <NavLink to="/forgotPassword" >Have you forgot the Password?</NavLink>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button type="submit" className="btn btn-primary">Login</button>
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

export default Login