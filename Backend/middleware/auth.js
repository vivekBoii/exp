const ErrorHander = require("../Utils/errorHander");
const catchAsyncErrors = require("./CatchAsyncError")
// method that a user can excess when he is logged in 
const jwt = require("jsonwebtoken");
const user = require("../Models/userModel")


exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    console.log("start");
    // console.log(req.body);
    // console.log(req.cookies);
    console.log("end");

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHander("please login to access this resource",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await user.findById(decodedData.id)
    // console.log(token);

    next();
}); 

// check if wheather user is admin 

exports.authorizeRoles =(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHander(`Role : ${req.user.role} is not allowed to access this source`,403));
        }
        next();
    }
}
