/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.js";
import { useCart } from "../context/cartContext.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line 
  const [token, setToken] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

  const handleRemove = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    // ---changing the local storage cart with the new cart
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const TotalPrice = () => {
    let total = 0;
    cart?.map((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // generate token  for payment gateway
  const getClientToken = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}braintree/token`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.PaymentToken.clientToken);
          setClientToken(response.data.PaymentToken.clientToken);
        }
      });
  };


  // ----- payment 
  const handlePayment = async() => {

    const {nonce} = await instance.requestPaymentMethod()
    setLoading(true)
    await axios.post(`${process.env.REACT_APP_API}braintree/payment`,{nonce:nonce,cart:cart}).then((response)=>{
        console.log(response);
       
        setLoading(false)
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/orders')
      
    }).catch((err) => {
      console.log(err);
    })

  }

  useEffect(() => {
    getClientToken();
  }, [token?.token]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {token?.token && token?.user?.name ? (
              <h1 className="text-center my-2">{`Hello ${token.user.name}`}</h1>
            ) : (
              <h1 className="text-center my-2">Hello</h1>
            )}

            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    token?.token ? "" : "Please Login to CheckOut"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            {cart.map((cartItem) => (
              <>
                <div className="row card mb-2 p-2 flex-row">
                  <div className="col-md-4">
                    {" "}
                    <img
                      src={`${process.env.REACT_APP_API}get-photo/${cartItem._id}`}
                      alt={cartItem.name}
                      className="card-img-top"
                      style={{ width: "150px", height: "150px" }}
                    ></img>
                  </div>
                  <div className="col-md-8">
                    <p>{cartItem.name}</p>
                    <p>{cartItem.description}</p>
                    <p>Price:{cartItem.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleRemove(cartItem._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="col-md-6 text-center">
            <h2>Cart Summary</h2>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h3>Total: {TotalPrice()} </h3>
            {token?.user?.address ? (
              <>
                {token?.token ? (
                  <div>
                    <h4>Your Current Address</h4>
                    {token?.user?.address}
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-outline-warning">Login</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <h4>We dont have your address please update your profile</h4>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            )}

            

            <div className="mt-2">
              {
                !clientToken || !cart?.length ?  ("") : (<>
                
                
                  <DropIn
                    options={{ 
                      authorization: clientToken,
                      paypal:{
                        flow:'vault'
                      } }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />
                  <button className="btn btn-primary" 
                  onClick={handlePayment}
                  >{loading ? "Processing ....." : "Make Payment"}</button>
                
                  
                  </>)
               }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
