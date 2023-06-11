import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";

const ProductCard = (props) => {
    const [cart,setCart]= useCart()
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
      console.log(product)
      localStorage.setItem('cart', JSON.stringify([...cart,product]))
      setCart([...cart,product])
    }



  return (
    <div className="card " style={{ width: `${props.width}` }} key={props._id}>
      <img
        src={`${process.env.REACT_APP_API}get-photo/${props._id}`}
        alt={props.name}
        className="card-img-top"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text">$ {props.price}</p>
        <div className="d-flex">
          <button className="btn btn-primary ms-2" onClick={()=>{handleAddToCart(props.p)}}>Add To Cart</button>
          <button
            className="btn btn-secondary ms-2"
            onClick={()=>{navigate(`/product-Details/${props.slug}`)}}
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
