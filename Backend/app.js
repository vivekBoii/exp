const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv"); //for env file

const path = require("path")

app.use(cors({
    origin: 'http://localhost:5173', // Change this to the origin of your React app
    credentials: true,
}));

//config
// if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"Backend/Config/.env"});
// }
// iske baad kyoki usko env variables ki need hai 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// RouteImport

const product = require("./Routes/ProductRoute");
const user = require('./Routes/UserRoute');
const order = require("./Routes/OrderRoute");
const payment = require("./Routes/PaymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

console.log(path.join(__dirname,"../Frontend/dist"))

app.use(express.static(path.join(__dirname,"../Frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../Frontend/dist/index.html"))
})

//middleware for Error
app.use(errorMiddleware)

module.exports = app; 