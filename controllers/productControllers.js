const product = require("../models/product");


// ADD PRODUCT
const addproduct = async (req, res) => {
    try {
        let {productName, productImage, productPrice, productDec} = req.body;

        if(!(productName, productImage, productPrice, productDec))
        {
            return res.status(400).send('All fields are required')
        }

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        console.log(userid);

        request.body.userId = userid;

        await product.create(req.body);

        return res.status(200).send('product added successfully')
        
    } catch (err) {
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
            return res.status(400).send('All fields are required')
        }

        let token = req.cookies.jwt;

        let userid = await jwt.verify(token, process.env.TOKEN_KEY)

        let productdata = await product.findById(id)

        if(productdata.userid !== userid)
        {
            return res.status(400).send('only owner can update product')
        }

        await product.findByIdAndUpdate(id, req.body)

        return res.status(200).send('Product updated successfully')

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
            return res.status(400).send('only owner can delete product')
        }

        await product.findByIdAndDelete(id)

        return res.status(200).send('product deleted successfully')

    } catch (err) {
        return res.status(500).send(err.massage)
    }
}

module.exports = {
    addproduct,
    updateProduct,
    deleteProduct
}