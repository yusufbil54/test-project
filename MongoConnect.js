const mongoose = require("mongoose");

//Connect MongoDB
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.DbConnection, {
    })
    .then(() => {
        console.log('DB connected successfuly');
    }).catch((error) => console.log('DB not connected', error.message));

