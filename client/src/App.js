import './App.css';
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactUs from './pages/ContactUs'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import PrivateRoute from './components/Routes/Private';
import Dashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard'
import Forgotpassword from './pages/Auth/Forgotpassword';
import Adminroute from './components/Routes/Adminroute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/forgotPassword' element={<Forgotpassword/>} />
      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>} />
      </Route>
      <Route path='/dashboard' element={<Adminroute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
      </Route>
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/policy'  element={<Policy />} />
      <Route path='/*'  element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
