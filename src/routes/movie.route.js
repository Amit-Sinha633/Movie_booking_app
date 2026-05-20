import { Router } from "express";
import { createMovie, deleteMovie, getMovie, updateMovie } from "../controllers/movie.controller.js";
import { validateMovieCreateRequest} from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/movies").post(validateMovieCreateRequest,createMovie)
router.route("/movies/:movieId").delete(deleteMovie)
router.route("/movies/:movieId").get(getMovie)
router.route("/movies/:movieId").put(updateMovie)
router.route("/movies/:movieId").patch(updateMovie)


export default router