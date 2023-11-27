const ErrorHander = require('../Utils/errorHander');

module.exports =(err,req, res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong mongodb Id error
    if(err.name=== "CastError"){
        const message = `Resource mot found. Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }
    
    //duplicate key errror
    if(err.code ===11000){
        const message = `Duplicate ${object.keys(err.keyValue)} Entered`
        err = new ErrorHander(message,400);
    }

    //jsonweb token error
    if(err.name=== "JsonWebTokenError"){
        const message = `Json web token is Invalid,try again`;
        err = new ErrorHander(message,400);
    }

    //jsonweb token expire
    if(err.name=== "TokenExpiredError"){
        const message = `Json web token is Expired,try again`;
        err = new ErrorHander(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}