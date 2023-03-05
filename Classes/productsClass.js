const Product = require('../Models/products');
const fs = require('fs');
const aws=require('aws-sdk');
module.exports=class classProduct {
    constructor(name, price, description, image) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
    AutoId=1;
    create= async (req,params) => {
        const s3 = new aws.S3({
            accessKeyId:process.env.accessKeyId,
            secretAccessKey:process.env.secretAccessKey,
            region:process.env.region
        });
        s3.upload({
            Bucket:process.env.Bucket,
            Key:`image-${Date.now()}.jpeg`,
            Body:req.files.image.data,
        },(error,data)=>{
            if(error){
                return error;
            }else
            {
                Product.create({
                    ...params,
                    image: data.Location,
                });
                return data;
            }
        });
        await Product.findOneAndUpdate(
            {email:params.email},
            {"$inc":{"id":this.AutoId++}},
            {new:true,upsert:true}
        );

    }
    getAll= async () => {
        try {
            const products = await Product.find({});
            return { success: true, message: 'All users', data: products };
        } catch (error) {
            return { error: error.message };
        }
    }
    update= async (id,params) => {
        try {
            const user=await Product.findOneAndUpdate({id:id},params,{new:true});
            return { success: true, message: 'User updated successfully', data: user };
        }catch (error) {
            return { error: error.message };
        }
    }
    delete= async (id) => {
        try {
            const product = await Product.findOneAndDelete({id:id});
            return { success: true, message: 'User deleted successfully', data: product };
        } catch (error) {
            return { error: error.message };
        }
    }

}
