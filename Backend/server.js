const app = require("./app");
// npm i express mongoose dotenv 
// const dotenv = require("dotenv"); //for env file
const cloudinary = require('cloudinary');
// import Database
const ConnectDatabase = require("./db/db")

// handling uncaught Exception 
// console.log(youtube); in error ke liye
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception `);
    process.exit(1);

})

//config
// if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"Backend/Config/.env"});
// }
// iske baad kyoki usko env variables ki need hai 
ConnectDatabase().catch(err => console.log(err));

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`); 
})


//unhandled promise rejections due to wrong link in env
process.on("unhandledRejection",error =>{
    console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to Unhandled Promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})