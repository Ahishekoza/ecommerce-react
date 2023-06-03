import express from "express";
const router =  express.Router();
import { requireSignIn,isAdmin } from "../middlewares/authmiddleware.js";
import { createProduct, getAllProducts,getSingleProduct,getSinglePhoto ,deleteProduct,updateProduct} from "../controller/productController.js";
import formidable from 'express-formidable'

// create product
router.post('/admin/Add-products', requireSignIn , isAdmin , formidable(), createProduct);


// Get All Products
router.get('/All-Products',getAllProducts)

// get single product
router.get('/Single-Product/:slug',getSingleProduct)

// get single photo
router.get('/get-photo/:productId', getSinglePhoto)

// delete single product
router.get('/delete-product/:productId', deleteProduct)

// Update product 
router.put('/admin/update-product/:productId', requireSignIn , isAdmin , formidable(), updateProduct);
export default router

