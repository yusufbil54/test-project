const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require("method-override");
const User = require('./Models/users.js');

const classProducts= require('./Classes/productsClass.js');
const classUser= require('./Classes/userClass.js');


require('dotenv').config();
require('./MongoConnect.js');

//Express
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));



//Middleware
app.use(methodOverride("_method",{ methods: ["POST", "GET"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Create new instance of classes
products=new classProducts();
user=new classUser();
//API

app.post('/api/users',(req,res)=>{
    try {
        if(process.env.API_KEY===req.body.apiKey)
        {
            switch (req.body.action) {
                case 'create':
                    user.create(req.body).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                case 'getAll':
                    user.getAll().then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                default:
            }
        }else
        {
            res.status(400).json({error:'Invalid API Key'});
        }
    }catch (error) {
        return res.json({ error: error.message });
    }
});
app.post('/api/users/:id',(req,res)=>{
    try {
        if(process.env.API_KEY===req.body.apiKey)
        {
            switch (req.body.action) {
                case 'update':
                    user.update(req.params.id,req.body).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                case 'delete':
                    user.delete(req.params.id).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                default:
            }
        }else
        {
            res.status(400).json({error:'Invalid API Key'});
        }
    }catch (error) {
        return res.json({ error: error.message });
    }
});

app.post('/api/products',(req,res)=>{
    try {
        if(process.env.API_KEY===req.body.apiKey)
        {
            switch (req.body.action) {
                case 'create':
                    products.create(req,req.body).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                case 'getAll':
                    products.getAll().then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                default:
            }
        }else
        {
            res.status(400).json({error:'Invalid API Key'});
        }
    }catch (error) {
        return res.json({ error: error.message });
    }
});

app.post('/api/products/:id',(req,res)=>{
    try {
        if(process.env.API_KEY===req.body.apiKey)
        {
            switch (req.body.action) {
                case 'update':
                    products.update(req.params.id,req.body).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                case 'delete':
                    products.delete(req.params.id).then(function (result) {
                        res.status(200).json(result);
                    });
                    break;
                default:
            }
        }else
        {
            res.status(400).json({error:'Invalid API Key'});
        }
    }catch (error) {
        return res.json({ error: error.message });
    }
});



//Port
const port= process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

