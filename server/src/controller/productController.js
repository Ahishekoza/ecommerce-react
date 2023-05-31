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