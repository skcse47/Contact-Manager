const constant = require('../constants')

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode: 500;

    switch (statusCode) {
        case constant.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stackTrace
            });
            break;
        case constant.FORBIDDEN:
            res.json({
                title:"FORBIDDEN",
                message:err.message,
                stackTrace:err.stackTrace
            });
            break;
        case constant.UNAUTHORIZED:
            res.json({
                title:"UNAUTHORIZED",
                message:err.message,
                stackTrace:err.stackTrace
            });
            break;
        case constant.VALID_ERROR:
            res.json({
                title:"In Valid",
                message:err.message,
                stackTrace:err.stackTrace
            });
            break;
    
        default:
            console.log("No error found")
            break;
    }
}


module.exports = errorHandler;