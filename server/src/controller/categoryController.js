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
        return res.status(200).json({
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
    
    const {name} = req.body
    const { Id } = req.params
    
        await category.findByIdAndUpdate(Id, 
            {name,slug:slugify(name)},
            {new: true}
            ).then((updated)=>{
            return res.status(200).json({
                success: true,
                message: "category updated successfully",
                updateCategory: updated
            })
        }).catch((err)=>{
            return res.status(500).json({
                success: false,
                message: err.message
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

    const {slug} =  req.params

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

    const {Id} =  req.params

    await category.findByIdAndDelete(Id).then((response)=>{
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