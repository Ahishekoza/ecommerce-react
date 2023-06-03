import product from "../models/product.js";
import slugify from "slugify";
import fs from 'fs'

export const createProduct = async(req,res) =>{
    
    const {name,description,price,category,quantity,shippingAddress} = req.fields

    const {photo} = req.files


    switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case !shippingAddress:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new product({...req.fields,slug:slugify(name)})
    if(photo){
        products.photo.data =  fs.readFileSync(photo.path)
        products.photo.contentType = photo.type
    }

    await products.save().then((response) => {
        return res.status(200).json({
            success: true,
            message: " products saved successfully",
            Product: response
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: `Failed to save product ${err.message}`
        })
    });

}


// Get a single product
export const getSingleProduct =async(req,res) => {
  await product.findOne({slug: req.params.slug}).select('-photo').then((product) => {
    if(product){
      return res.status(200).json({
        success: true,
        product: product
      })
    }
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: `Failed to get product ${err.message}`
    })
  });
}

// get All Products
export const getAllProducts = async(req, res) => {

    await product.find().populate('category').
    select('-photo').
    limit(12).sort({createdAt:-1}).then((response)=>{
    return res.status(200).json({
        success: true,
        products: response
    })
    }).catch((error)=>{
        return res.status(500).json({
            success: false,
            message: `Unable fetch products ${error.message}`
        });
    });

}


export const getSinglePhoto =async (req, res) => {

  const {productId} =  req.params

  await product.findById(productId).select('photo').then((product)=>{
    if(product.photo.data){
      res.set('Content-Type', product.photo.contentType)
      return res.status(200).json({
        success: true,
        photo: product.photo.data
      })
    }
  }).catch((error)=>{
    return res.status(500).json({
      success: false,
      message: `Unable to find product photo: ${error.message}`
    })
  })
}


export const deleteProduct = async(req, res) => {

  const {productId} = req.params
  
  await product.findByIdAndDelete(productId).then((product)=>{
    if(product){
      return res.status(200).json({
        success: true,
        message : 'Product was successfully deleted'
      })
    }
  }).catch((error)=>{
    return res.status(500).json({
      success: false,
      message : 'Product could not be deleted'
    })
  })
}


// update product
export const updateProduct = async(req,res) =>{
    
  const {name,description,price,category,quantity,shippingAddress} = req.fields

  const {photo} = req.files


  switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !shippingAddress:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
  }

  
  

  const products = await product.findByIdAndUpdate(
    req.params.productId,
    { ...req.fields, slug: slugify(name) },
    { new: true }
  );
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  await products.save()
  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    updateProduct: products,
  })

}
