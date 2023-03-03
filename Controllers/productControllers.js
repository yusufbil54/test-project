const Product = require('../Models/products');
const fs = require('fs');
const aws=require('aws-sdk');


exports.createProduct = async (req, res) => {
    const s3 = new aws.S3({
        accessKeyId:'AKIAYHXO2N45IW62NEXJ',
        secretAccessKey:'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',
        region:'us-west-2'
    });
    s3.upload({
        Bucket:'my-super-s3-bucket',
        Key:`image-${Date.now()}.jpeg`,
        Body:req.files.image.data,
    },(error,data)=>{
        if(error){
            res.status(500).send(error);
        }else
        {
            Product.create({
                ...req.body,
                image: data.Location,
            });
            res.status(200).send(data);

        }
    });

}
exports.updateProduct = async (req, res,next) => {
    try {
        const user=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.json({ success: true, message: 'User updated successfully', data: user })
    }catch (error) {
        return res.json({ error: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json({ success: true, message: 'All users', data: products })
    } catch (error) {
        return res.json({ error: error.message });
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: 'User deleted successfully', data: product })
    } catch (error) {
        return res.json({ error: error.message });
    }
}

