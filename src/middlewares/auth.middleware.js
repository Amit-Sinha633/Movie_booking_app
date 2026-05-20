const badReqestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed request || Bad request",
};

const validateMovieCreateRequest = async (req, res, next) => {
  // validate the movie name
  if (!req.body.name) {
    badReqestResponse.err = "The name of the movie is not present in the request send"
    return res.status(400).json(badReqestResponse);
  }
  // validate the movie description
  if (!req.body.description) {
    badReqestResponse.err = "The description of the movie is not present in the request send"
    return res.status(400).json(badReqestResponse);
  }
  // validate the movie casts
  if(!req.body.casts || !(Array.isArray(req.body.casts)) || req.body.casts.length <= 0){
    badReqestResponse.err = "The casts of the movie is not present in the request send"
    return res.status(400).json(badReqestResponse);
  }
  // validate the movie tralier url
  if(!req.body.trailerUrl){
    badReqestResponse.err = "The trailerurl of the movie is not present in the request send"
    res.status(400).json(badReqestResponse)
  }
  // validate for the releaseDate
  if(!req.body.releaseDate){
    badReqestResponse.err = "The releaseDate of the movie is not present in the request send"
    res.status(400).json(badReqestResponse)
  }
  // validation for the director
  if(!req.body.director){
    badReqestResponse.err = "The director of the movie is not present in the request send"
    res.status(400).json(badReqestResponse)
  }
 
  next()
};

export {validateMovieCreateRequest}
