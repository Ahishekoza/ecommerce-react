import React from "react";
import { useSearch } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {

    const navigate = useNavigate()

    const [values, setValues]= useSearch()

    const handleSubmit = async(e) => {
      e.preventDefault();
      
        await axios.post(`${process.env.REACT_APP_API}product-search`,{keyword:values.keyword}).then((response)=>{
            if(response.data.success){
                setValues({...values,results:response.data.productsList})
                console.log(response.data.productsList)
                navigate('/searchedProducts')
            }
            
        }).catch((error)=>{
            console.log(error.message)
        })
    }

  return (
    <>
      <div className="">
        <form className="form-inline my-2 my-lg-0 d-flex mx-2" onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e)=>setValues({...values, keyword : e.target.value})}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
