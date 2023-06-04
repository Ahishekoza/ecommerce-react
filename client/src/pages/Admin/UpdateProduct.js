import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import AdminPanel from "../../components/Layout/AdminPanel";
const { Option } = Select;

const UpdateProduct = () => {

  const navigate = useNavigate()

  // eslint-disable-next-line
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [Id, setId] = useState("");

  const binaryData = [];
  binaryData.push(photo);

  const params = useParams();

  const getSingleProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}Single-Product/${params.slug}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.product);
          setCategory(response.data.product.category);
          setName(response.data.product.name);
          setPrice(response.data.product.price);
          setDescription(response.data.product.description);
          setQuantity(response.data.product.quantity);
          setShippingAddress(response.data.product.shippingAddress);
          setPhoto(response.data.product.photo);
          setId(response.data.product._id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //   Get All Categories
  const getAllCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}All-Categories`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.categories);
          setCategories(response.data.categories);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  // ----Update product ------------------------------
  const handleUpdate = async () => {
    const productData =  new FormData()
    productData.append('name',name)
    productData.append('description',description)
    productData.append('price',price)
    productData.append('quantity',quantity)
    productData.append('shippingAddress', shippingAddress)
    productData.append('category',category)
    photo && productData.append('photo',photo)

    await axios.put(`${process.env.REACT_APP_API}admin/update-product/${Id}`,productData).then((response)=>{
      if(response.data.success){
        console.log(response.data.Product)
        navigate('/dashboard/admin/products')
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }


  // ---delete product
  const handleDelete = async() =>{
    let answer = window.prompt(`Are you sure you want to delete this product`)
    if(!answer) return 
    await axios.delete(`${process.env.REACT_APP_API}admin/delete-product/${Id}`).then((response)=>{
      if(response.data.success){
        console.log(response.data.message)
        navigate('/dashboard/admin/products')
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout title="E-commerce Update-Product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminPanel />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="w-75 m-1">
                <Select
                  placeholder="Select a Category"
                  bordered={false}
                  className="form-select"
                  size="large"
                  showSearch
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mt-3 ">
                  <label className="btn btn-outline-secondary w-100">
                    {photo ? photo.name : "Upload Photos"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                    ></input>
                  </label>
                </div>

                {photo ? (
                  <div className="text-center mt-2">
                    <img
                      src={window.URL.createObjectURL(
                        new Blob(binaryData, { type: "application/zip" })
                      )}
                      alt="Upload Images"
                      className="img img-responsive"
                    ></img>
                  </div>
                ) : (
                  <div className="text-center mt-2">
                    <img
                      src={`${process.env.REACT_APP_API}get-photo/${Id}`}
                      alt="Upload Images"
                      className="img img-responsive"
                    ></img>
                  </div>
                )}

                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={name}
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mt-3">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Description"
                    value={description}
                    name="description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    name="price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  ></input>
                </div>

                <div className="mt-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Quantity"
                    value={quantity}
                    name="quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mt-3">
                  <Select
                    bordered={false}
                    placeholder="Shipping Address"
                    size="large"
                    className="form-control"
                    value={shippingAddress? "Yes" : "No"}
                    onChange={(value) => {
                      setShippingAddress(value);
                    }}
                  >
                    <Option value="0">NO</Option>
                    <Option value="1">YES</Option>
                  </Select>
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary ms-2" onClick={handleUpdate}>Upadate Product</button>
                  <button className="btn btn-danger ms-2"  onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
