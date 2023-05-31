import express from "express";

const router = express.Router();
import { requireSignIn,isAdmin } from "../middlewares/authmiddleware.js";
import { createCategory,updateCategory,getAllCategories,getSingleCategory,deleteCategory} from "../controller/categoryController.js";
// I have Kept a base url for the api call in the frontend so don't weant to change that , 

router.post('/admin/create-category', requireSignIn, isAdmin,createCategory)

router.put('/admin/update-category', requireSignIn, isAdmin,updateCategory)

router.get('/All-Categories',getAllCategories)

router.post('/Single-Category',getSingleCategory)

router.post('/admin/deleteCategory',requireSignIn , isAdmin, deleteCategory)

export default router 