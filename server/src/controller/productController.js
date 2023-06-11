import product from "../models/product.js";
import slugify from "slugify";
import fs from 'fs'
import braintree from "braintree"
import order from "../models/orders.js"


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "jf3yrp67fpq6xswr",
  publicKey: "f8cczrwxrhz7btph",
  privateKey: "57666c9b294b27f48250c7ab07842937",
});


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
  await product.findOne({slug: req.params.slug}).select('-photo').populate('category').then((product) => {
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
      // --- use send not json to send photo as we are gone access photo directly 
      return res.status(200).send(product.photo.data
      )
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
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shippingAddress } =
      req.fields;
    const { photo } = req.files;
    //alidation
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
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


export const productFiltersController = async(req,res) => {

  const { checked,radio } = req.body
  let args={}
  if(checked.length>0) args.category = checked
  if(radio.length) args.price = { $gte : radio[0] , $lte : radio[1] }

  await product.find(args).then((response)=>{
    return res.status(200).json({
      success:true,
      products : response
    })
  }).catch((error)=>{
    return res.status(404).json({
      success:false,
      message:'Failed to find the products for mentioned filters'
    })
  })

}

export const productCountControllers =async(req,res) =>{

  await product.find().estimatedDocumentCount().then((count)=>{
    return res.status(200).json({
      success: true,
      productCount: count
    })
  }).catch((err)=>{
    return res.status(500).json({
      success: false,
      message: err.message
    })
  })

}

export const productsPerPage = async(req, res) =>{
  const perPage = 3
  const page = req.params.page ? req.params.page : 1
  await product.find()
  .select('-photo')
  .skip((page - 1)*perPage)
  .limit(perPage)
  .sort({createdAt: -1})
  .then((response)=>{
    return res.status(200).json({
      success:true,
      products:response
    })
  }).catch((err)=>{
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }); 
}

export const searchByKeyword =async(req,res)=>{

  const {keyword} = req.body;
  await product.find({
    $or:[
      { name :{$regex:keyword,$options:"i"}},
      { description:{$regex:keyword,$options:"i"}}
    ]
  }).select('-photo').then((response)=>{
    return res.status(200).json({
      success:true,
      productsList:response
    })
  }).catch((error)=>{
    return res.status(500).json({
      success:false,
      message:"Unable to retrieve products"
    })
  })

}

export const getSimilarProducts=async(req,res)=>{

  const { productId, categoryId} = req.params

  await product.find({
    category: categoryId,
    _id:{$ne:productId}
  }).select('-photo').populate('category').limit(3).then((response)=>{

    return res.status(200).json({
      success:true,
      relatedProducts: response
    })

  }).catch((error)=>{
    return res.status(404).json({
      success:false,
      message:`Related products could not be found ${error.message}`
    })
  })
}


export const getProductsOnCategories =async(req,res)=>{
  const {categoryId} = req.params

  await product.find({category: categoryId}).select('-photo').populate('category').then((products)=>{
    return res.status(200).json({
      success:true,
      products:products
    })
    }).catch((error)=>{
      return res.status(404).json({
        success:false,
        message:`Unable to find product for the category ${categoryId} ${error.message}`
      })
  })

}

export const braintreeTokenController = (req,res) =>{
  gateway.clientToken.generate({},(err,response)=>{
    if(err){
      return res.status(404).json({
        success:false,
        message:`Unable to generate Token: ${err.message}`
      })
    }
    else{
      return res.status(200).json({
        success:true,
        PaymentToken:response
      })
    }
  })
}

export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const orders = new order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};