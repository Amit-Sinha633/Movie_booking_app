import { Router } from "express";
import { createTheatre, deleteTheatre, getAllTheatre, getTheatre, updateTheatre, updateTheatreByAddMovie,getMovies } from "../controllers/theatre.controller.js";
import { validateTheatreCreateRequest, validationOfUpdateMovie } from "../middlewares/theatre.middleware.js";
const theatre = Router()

theatre.route("/theatre").post(validateTheatreCreateRequest,createTheatre)
theatre.route("/theatre/:theatreId").delete(deleteTheatre)
theatre.route("/theatre/:theatreId").get(getTheatre)
theatre.route("/theatres").get(getAllTheatre)
theatre.route("/:theatreId/movies").patch(validationOfUpdateMovie,updateTheatreByAddMovie)
theatre.route("/theatre").patch(updateTheatre)
theatre.route("/theatre").put(updateTheatre)
theatre.route("/:theatreId/movies").get(getMovies)


export default theatre