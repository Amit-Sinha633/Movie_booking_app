import { Router } from "express";
import { createTheatre, deleteTheatre, getAllTheatre, getTheatre, getTheatresByCityOrPinCode, updateTheatreByAddMovie } from "../controllers/theatre.controller.js";
import { validateTheatreCreateRequest, validationOfUpdateMovie } from "../middlewares/theatre.middleware.js";
const theatre = Router()

theatre.route("/theatre").post(validateTheatreCreateRequest,createTheatre)
theatre.route("/theatre/:theatreId").delete(deleteTheatre)
theatre.route("/theatre/:theatreId").get(getTheatre)
theatre.route("/theatres").get(getAllTheatre)
theatre.route("/:theatreId/movies").patch(validationOfUpdateMovie,updateTheatreByAddMovie)
theatre.route("/theatresByCityOrPinCode").get(getTheatresByCityOrPinCode)

export default theatre