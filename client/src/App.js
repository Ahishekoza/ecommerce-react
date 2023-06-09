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
import CreateCategory from './pages/Admin/CreateCategory';
import { CreateProduct } from './pages/Admin/CreateProduct';
import AdminUser from './pages/Admin/AdminUser';
import Profile  from './pages/User/Profile'
import Orders  from './pages/User/Orders'
import Products from './pages/Admin/Products.js'
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchedProduct from './pages/SearchedProduct';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/forgotPassword' element={<Forgotpassword/>} />
      <Route path='/category' element={<Categories/>} />
      <Route path='/searchedProducts' element={<SearchedProduct/>} />
      <Route path='/product-Details/:slug' element={<ProductDetails/>} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>} />
        <Route path='user/profile' element={<Profile/>} />
        <Route path='user/orders' element={<Orders/>} />
      </Route>
      <Route path='/dashboard' element={<Adminroute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/users' element={<AdminUser/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
      </Route>
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/policy'  element={<Policy />} />
      <Route path='/*'  element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
