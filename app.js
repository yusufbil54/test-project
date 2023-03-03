const express = require("express");
const methodOverride = require("method-override");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
const mongoose = require("mongoose");
const {render} = require("express/lib/application");

//Connect MongoDB
mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb://127.0.0.1:27017/testProject', {
    })
    .then(() => {
        console.log('DB connected successfuly');
    }).catch((error) => console.log('DB not connected', error.message));

const app = express();

//Middleware
app.use(methodOverride("_method",{ methods: ["POST", "GET"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
//Port
const port= process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

