import Theatre from "../models/theatre.model.js";
import { successResponse, errorResponse } from "../utils/responseBody.util.js";
import { deleteMovie } from "./movie.controller.js";
const createTheatre = async function (req, res) {
  try {
    const { name, description, city, pinCode, address } = req.body;
    const theatre = await Theatre.create({
      name,
      description,
      city,
      pinCode,
      address,
    });
    successResponse.data = theatre;
    successResponse.msg = "Successfuly created the theatre";
    return res.status(201).json(successResponse);
  } catch (error) {
    errorResponse.err = error;
    return res.status(500).json(errorResponse);
  }
};

const deleteTheatre = async function (req, res) {
  try {
    const { theatreId } = req.params;
    if (!theatreId) {
      return res.status(400).json({
        msg: "No theatre id passes in the params",
      });
    }
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      errorResponse.msg = "no theatre found";
      return res.status(404).json(errorResponse);
    }
    const deletedTheatre = await Theatre.findByIdAndDelete(theatreId);
    successResponse.msg = "Successfully deleted the theatre";
    successResponse.data = theatre;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.msg = "Something went wrong from server side";
    errorResponse.err = error;
    return res.status(500).json(errorResponse);
  }
};

const getTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({
        msg: "No theatre found",
      });
    }
    successResponse.body = theatre;
    successResponse.msg = "This is the details of the theatre";
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.err = error;
    errorResponse.msg = "Somethig went wrong from server side";
    return res.status(500).json(errorResponse);
  }
};

const getTheatresByCityOrPinCode = async (req, res) => {
  try {
    const { city, pinCode, name, limit, skip } = req.query;
    if (!(city || pinCode || name)) {
      errorResponse.msg = "City or pinCode or name is required";
      return res.status(400).json(errorResponse);
    }
    const theatres = await Theatre.find({
      $or: [{ city }, { pinCode }, { name }],
    })
      .limit(limit)
      .skip(skip * limit);
    if (!theatres) {
      errorResponse.msg = "No theatre found";
      return res.status(404).json(errorResponse);
    }
    successResponse.msg = "These are the theatres";
    successResponse.data = theatres;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.msg = error;
    console.log(error);
    return res.status(500).json(errorResponse);
  }
};
const getAllTheatre = async (req, res) => {
  try {
    const query = {}
    if(req.query && req.query.city){
      query.city = req.query.city
    }
    const theatres = await Theatre.find(query)
    successResponse.data = theatres;
    successResponse.msg = "thease are all the theatres";
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.err = error;
    errorResponse.msg = "Something went wrong form server side";
    return res.status(500).json(errorResponse);
  }
};

const updateTheatreByAddMovie = async (req, res) => {
  try {
    const { theatreId } = req.params;
    const { movies, insert } = req.body;
    const movieIds = movies;
    if (!theatreId) {
      return res.status(400).json({
        err: "No theatreId found",
      });
    }
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({
        msg: "No theatre found from this theatreId",
      });
    }
    if (insert) {
      await Theatre.findByIdAndUpdate(
        {_id:theatreId},
        {$addToSet:{movies:{$each: movieIds}}},
        {new:true}
      )
    } else {
      await Theatre.findByIdAndUpdate(
        {_id:theatreId},
        {$pull:{movies:{$in:movieIds}}},
        {new:true}
      )
    }
    await theatre.save();
    successResponse.msg = "Successfully updated the movie in the theatre";
    successResponse.data = theatre;
    return res.status(200).json({
      successResponse,
    });
  } catch (error) {
    errorResponse.err = error;
    console.log(error);
    return res.status(500).json(errorResponse);
  }
};

const updateTheatre = async(req,res) =>{
    try {
        const {theatreId} = req.query
        console.log(theatreId)
        if(!theatreId){
            errorResponse.msg = "theatreId don't found"
            return res.status(400).json(errorResponse)
        }
        const theatre = await Theatre.findByIdAndUpdate({_id:theatreId},req.body,{new:true,runValidators:true})
        if(!theatre){
            errorResponse.msg = "No thetare found"
            return res.status(404).json(errorResponse)
        }
        successResponse.msg = "Successfully updated the theatre"
        successResponse.data = theatre
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.msg = "Something went wrong from server"
        errorResponse.err = error
        return res.status(500).json(errorResponse)
    }
}
export {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getAllTheatre,
  updateTheatreByAddMovie,
  getTheatresByCityOrPinCode,
  updateTheatre
};
