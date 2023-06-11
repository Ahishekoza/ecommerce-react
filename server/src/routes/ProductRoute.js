import express from "express";
const router =  express.Router();
import { requireSignIn,isAdmin } from "../middlewares/authmiddleware.js";
import { 
    createProduct, 
    getAllProducts,
    getSingleProduct,
    getSinglePhoto ,
    deleteProduct,
    updateProduct,
    productFiltersController,
    productCountControllers,
    productsPerPage,
    searchByKeyword,
    getSimilarProducts,
    getProductsOnCategories,
    braintreeTokenController,
    braintreePaymentController
} from "../controller/productController.js";
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
router.delete('/admin/delete-product/:productId', requireSignIn, isAdmin, deleteProduct)

// Update product 
router.put('/admin/update-product/:productId', requireSignIn , isAdmin , formidable(), updateProduct);

// ProductFilters

router.post('/product-filters',productFiltersController)

// --product Count
router.get('/product-count', productCountControllers)

// ---product Per Page
router.get('/product-per-page/:page', productsPerPage)

// --getting product using search bar
router.post('/product-search',searchByKeyword)

router.get('/related-products/:productId/:categoryId', getSimilarProducts)

// ----get products based on category
router.get('/category-based-products/:categoryId',getProductsOnCategories)

// ----- payments routes token
router.get('/braintree/token', braintreeTokenController)

// // payments
router.post('/braintree/payment', requireSignIn ,braintreePaymentController)

export default router

