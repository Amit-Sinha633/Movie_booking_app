import { errorResponse } from "../utils/responseBody.util.js";
const validateTheatreCreateRequest = function (req, res,next) {
  if (!req.body.name) {
    errorResponse.msg =
      "The name of the theatre does not present in the request";
    return res.status(400).json(errorResponse);
  }
  if (!req.body.city) {
    errorResponse.msg =
      "The city of the theatre does not present in the request";
      return res.status(400).json(errorResponse)
  }
  if(!req.body.pinCode){
    errorResponse.msg = "The pinCode of the theatre does not present in the request";
    return res.status(400).json(errorResponse)
  }
  if(!req.body.address){
    errorResponse.msg = "The address of the theatre does not present in the request";
    return res.status(400).json(errorResponse)
  }
  next()
};


const validationOfUpdateMovie = async(req,res,next)=>{
  if(!req.body.insert == undefined){
    errorResponse.msg = "intest parameter not defined"
    return res.status(400).json(errorResponse)
  }
  if(!req.body.movies){
    errorResponse.msg = "movies parameter not defined"
    return res.status(400).json(errorResponse)
  }
  if(!(Array.isArray(req.body.movies))){
    errorResponse.msg = "movies type is expected array form" 
    return res.status(400).json(errorResponse)
  }
  if(req.body.movies.length == 0){
    errorResponse.msg = "No movie send"
    return res.status(400).json(errorResponse)
  }
  next()
}
export {validateTheatreCreateRequest,validationOfUpdateMovie}

