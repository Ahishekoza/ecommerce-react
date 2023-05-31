import express from "express";
const router =  express.Router();
import { requireSignIn,isAdmin } from "../middlewares/authmiddleware.js";
import { createProduct, getAllProducts } from "../controller/productController.js";
import formidable from 'express-formidable'

router.post('/admin/Add-products', requireSignIn , isAdmin , formidable(), createProduct);

router.get('/All-Products',getAllProducts)

export default router

