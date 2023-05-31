import category from "../models/category.js";
import slugify from 'slugify'

export const createCategory = async(req,res)=>{
    const {name} = req.body

    if(!name){
        return res.statsu(403).json({
          success: false,
          message: "Name is required"  
        })
    }


    //  Check if the category is already present

    const existing = await category.findOne({name: name})

    if(existing){
        return response.status(200).json({
            success: true,
            message:'Category already present'
        });
    }

    // Create a new category
    await category.create({name:name, slug:slugify(name)}).then((resposne)=>{
        return res.status(200).json({
            success: true,
            message: resposne
        })
    }).catch((err)=>{
        return res.status(503).json({
            success: false,
            message: err.message
        })
    })
} 

//  Update Category
export const updateCategory = async(req,res) => {
    
    const {name,newName} = req.body

    await category.findOne({name:name}).then(async(reponse)=>{
        await category.findByIdAndUpdate(reponse._id, {name:newName,slug:slugify(newName)}).then((updated)=>{
            return res.status(200).json({
                success: true,
                message: "category updated successfully",
            })
        }).catch((err)=>{
            return res.status(500).json({
                success: false,
                message: err.message
            })
        });
    }).catch((err)=>{
        return res.status(403).json({
            message: `Unable to find a category ${err.message}`
        })
    });

}

// Get All Categories
export const getAllCategories = async(req,res) => {
    await category.find().then((response)=>{
        return res.status(200).json({
            success: true,
            message:"Categories found",
            categories: response
        })
    }).catch((err)=>{
        return res.status(500).json({
            success: false,
            message:`Error while getting categories ${err.message}`
        })
    })
}

// Getting a single category
export const getSingleCategory = async(req, res) => {

    const {slug} =  req.body

    await category.findOne({slug:slug}).then((response)=>{
        return res.status(200).json({
            success:true,
            message: "category fetched successfully",
            Category: response
        })
    }).catch((error)=>{
        return res.status(error).json({
            success:false,
            message:"Failed to fetch category"
        });
    })

}

// delete category

export const deleteCategory = async(req,res) => {

    const {name} =  req.body

    await category.deleteOne({name: name}).then((response)=>{
        return res.status(200).json({
            success:true,
            message: "category deleted successfully",
        })
    }).catch((error)=>{
        return res.status(error).json({
            success:false,
            message:"Failed to delete category"
        });
    })

}