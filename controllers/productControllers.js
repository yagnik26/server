const product = require("../models/product");
const jwt = require('jsonwebtoken')


// ADD PRODUCT
const addproduct = async (req, res) => {
    try {
        let {productName, productImage, productPrice, productDesc, userId} = req.body;

        console.log(req.body);

        if(!(productName, productImage, productPrice, productDesc))
        {
            return res.status(400).json('All fields are required')
        }

        let token = userId;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        console.log(userid);

        req.body.userId = userid;

        await product.create(req.body);

        return res.status(200).json('product added successfully')
        
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.massage);
    }
}

// UPDATE PRODUCT

const updateProduct = async (req, res) => {
    try {
        let id = req.params.id;

        let {productName, productImage, productPrice, productDec} = req.body;

        if(!(productName, productImage, productPrice, productDec))
        {
            return res.status(400).json('All fields are required')
        }

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        let productdata = await product.findById(id)

        if(productdata.userid !== userid)
        {
            return res.status(400).json('only owner can update product')
        }

        await product.findByIdAndUpdate(id, req.body)

        return res.status(200).json('Product updated successfully')

    } catch (err) {
        return res.status(500).send(err.massage);
    }
}

// DELETE PRODUCT

const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id;

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        let productdata = await product.findById(id)

        if(productdata.userid !== userid)
        {
            return res.status(400).json('only owner can delete product')
        }

        await product.findByIdAndDelete(id)

        return res.status(200).json('product deleted successfully')

    } catch (err) {
        return res.status(500).send(err.massage)
    }
}

// ALL PRODUCTS

const allProduct = async (req, res) => {
    try {
        let productdata = await product.find();

        return res.status(200).json(productdata)

    } catch (err) {
        return res.status(500).send(err.massage)
    }
}

// SHOW ONLY USER PRODUCT

const userProduct = async (req, res) => {
    try {
        let {userId} = req.body;
        console.log(userId);
        let id = await jwt.verify(userId,process.env.TOKEN_KEY)
        console.log(id);
        let productData = await product.find({userId : id})
        if(!productData)
        {
            return res.status(500).json('No product found')
        }

        return res.status(200).json(productData)
    } catch (err) {
        return res.status(500).send(err.massage)
    }
}

module.exports = {
    addproduct,
    updateProduct,
    deleteProduct,
    allProduct,
    userProduct
}