import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Product from './Pages/Product';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { useDispatch } from "react-redux";
import { loadUserRequest } from './Redux/User/userReducer';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { Cart } from './Pages/Cart';
import Shipping from './Pages/Shipping';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Pages/Payment';
import Success from './Pages/Success';
import Myorders from './Pages/Myorders';
import OrderDetails from './Pages/OrderDetails';
import Dashboard from './Pages/Dashboard';
import ProductList from './Pages/ProductList';
import NewProduct from './Pages/NewProduct';
import UpdateProduct from './Pages/UpdateProduct';
import AllOrders from './Pages/AllOrders';
import OrderAdmin from './Pages/OrderAdmin';
import UsersAdmin from './Pages/UsersAdmin';
import UpdateProfileAdmin from './Pages/UpdateProfileAdmin';
import ReviewsAdmin from './Pages/ReviewsAdmin';
import ReviewsByIdAdmin from './Pages/ReviewsByIdAdmin';
import Contact from './Pages/Contact';
import About from './Pages/About';
import NotFound from './Pages/NotFound';


const App = () => {

  const [stripeApiKey, setstripeApiKey] = useState("")
  const dispatch = useDispatch();

  async function getStripeApiKey(){
    const config={headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await axios.get("http://localhost:4000/api/v1/stripeapikey",config);
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUserRequest());
    getStripeApiKey();
  }, [])

  // window.addEventListener("contextmenu",(e)=>{e.preventDefault()});
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route exact path='/Home' element={<Home/>}/>
          <Route exact path='' element={<Home/>}/>
          <Route exact path='/Contact' element={<Contact/>}/>
          <Route exact path='/About' element={<About/>}/>
          <Route exact path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/products/:keyword' element={<Product/>}/>
          <Route exact path='/products' element={<Product/>}/>
          <Route exact path='/Login' element={<Login/>}/>
          <Route exact path='/Signup' element={<SignUp/>}/>
          <Route exact path='/account' element={<Profile/>}/>
          <Route exact path='/me/update' element={<UpdateProfile/>}/>
          <Route exact path='/password/update' element={<UpdatePassword/>}/>
          <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
          <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/shipping' element={<Shipping/>}/>
          <Route exact path='/success' element={<Success/>}/>
          <Route exact path='/order/me' element={<Myorders/>}/>
          <Route exact path='/order/me/:id' element={<OrderDetails/>}/>
          <Route exact path='/admin/dashboard' element={<Dashboard/>}/>
          <Route exact path='/admin/productList' element={<ProductList/>}/>
          <Route exact path='/admin/product/new' element={<NewProduct/>}/>
          <Route exact path='/admin/product/:id' element={<UpdateProduct/>}/>
          <Route exact path='/admin/orders' element={<AllOrders/>}/>
          <Route exact path='/admin/order/:id' element={<OrderAdmin/>}/>
          <Route exact path='/admin/users' element={<UsersAdmin/>}/>
          <Route exact path='/admin/user/:id' element={<UpdateProfileAdmin/>}/>
          <Route exact path='/admin/reviews' element={<ReviewsAdmin/>}/>
          <Route exact path='/admin/review/:id' element={<ReviewsByIdAdmin/>}/>
          {stripeApiKey && (
            <Route exact path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          )}
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;