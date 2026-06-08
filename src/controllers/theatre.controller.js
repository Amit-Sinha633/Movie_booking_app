import Theatre from "../models/theatre.model.js";
import { successResponse,errorResponse } from "../utils/responseBody.util.js"
import { deleteMovie } from "./movie.controller.js";
const createTheatre = async function(req,res){
    try {
        const {name,description,city,pinCode,address} = req.body
        const theatre = await Theatre.create({name,description,city,pinCode,address})
        successResponse.data = theatre
        successResponse.msg = "Successfuly created the theatre"
        return res.status(201).json(successResponse)
    } catch (error) {
        errorResponse.err = error
        return res.status(500).json(errorResponse)
    }
}

const deleteTheatre = async function(req,res){
    try {
        const {theatreId} = req.params
        if(!theatreId){
            return res.status(400).json({
                msg: "No theatre id passes in the params"
            })
        }
        const theatre = await Theatre.findById(theatreId)
        if(!theatre){
            errorResponse.msg = "no theatre found"
            return res.status(404).json(errorResponse)
        }
        const deletedTheatre = await Theatre.findByIdAndDelete(theatreId)
        successResponse.msg = "Successfully deleted the theatre"
        successResponse.data = theatre
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.msg = "Something went wrong from server side"
        errorResponse.err = error
        return res.status(500).json(errorResponse)
    }
}

const getTheatre = async(req,res) =>{
    try {
        const {theatreId} = req.params
        const theatre = await Theatre.findById(theatreId)
        if(!theatre){
            return res.status(404).json({
                msg: "No theatre found"
            })
        }
        successResponse.body = theatre
        successResponse.msg = "This is the details of the theatre"
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.err = error
        errorResponse.msg = "Somethig went wrong from server side"
        return res.status(500).json(errorResponse)
    }
}

const getTheatresByCityOrPinCode = async(req,res) =>{
    try {
        const {city,pinCode,name} = req.query
        if(!(city || pinCode || name)){
            errorResponse.msg = "City or pinCode or name is required"
            return res.status(400).json(errorResponse)
        }
        const theatres = await Theatre.findOne({
            $or:[
                {city},
                {pinCode},
                {name}
            ]
        })
        if(!theatres){
            errorResponse.msg = "No theatre found"
            return res.status(404).json(errorResponse)
        }
        successResponse.msg = "These are the theatres"
        successResponse.data = theatres
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.msg = error
        console.log(error)
        return res.status(500).json(errorResponse)
    }
}
const getAllTheatre = async (req,res) =>{
    try {
        const theatres = await Theatre.find()
        successResponse.data = theatres
        successResponse.msg = "thease are all the theatres"
        return res.status(200).json(successResponse)
    } catch (error) {
        errorResponse.err = error
        errorResponse.msg = "Something went wrong form server side"
        return res.status(500).json(errorResponse)
    }
}

const updateTheatreByAddMovie = async(req,res) =>{
   try {
     const {theatreId} = req.params
     const {movies,insert} = req.body
     const movieIds = movies 
    if(!theatreId){
        return res.status(400).json({
            err: "No theatreId found"
        })
    }
    const theatre = await Theatre.findById(theatreId)
    if(!theatre){
        return res.status(404).json({
            msg: "No theatre found from this theatreId"
        })
    }
    if(insert){
        movieIds.forEach((movieId)=>{
            theatre.movies.push(movieId)
        })
    }else{
        // const savedMovies = await theatre.movies
        // savedMovies.forEach((movie)=>{
        //     savedMovies = movieIds.filter((id)=>id == movie)
        // })
    }
    await theatre.save()
    successResponse.msg = "Successfully updated the movie in the theatre"
    successResponse.data = theatre
    return res.status(200).json({
        successResponse
    })
   } catch (error) {
    errorResponse.err = error
    console.log(error)
    return res.status(500).json(errorResponse)
   }
}
export {createTheatre,deleteTheatre,getTheatre,getAllTheatre,updateTheatreByAddMovie,getTheatresByCityOrPinCode}