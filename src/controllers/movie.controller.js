import Movie from "../models/movie.model.js";

const createMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releaseStatus,
    } = req.body;
    console.log(req.body);

    const newMovie = await Movie.create({
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releaseStatus,
    });
    return res.status(201).json({
      success: "true",
      error: {},
      data: newMovie,
      msg: "Movie created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      error: error,
      data: {},
      msg: "Something went wrong from server while create a movie",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({
        msg: "No movieId found",
      });
    }

    const deleteMovie = await Movie.findByIdAndDelete(movieId);
    if (!deleteMovie) {
      return res.status(404).json({
        msg: "No movie found",
      });
    }
    return res.status(200).json({
      success: true,
      error: {},
      data: deleteMovie,
      msg: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: {},
      msg: "Something went wrong from server side while deleting movie",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({
        msg: "no movieId found",
      });
    }
    const movieDetails = await Movie.findById(movieId);
    if (!movieDetails) {
      return res.status(404).json({
        msg: "No movie found",
      });
    }
    return res.status(200).json({
      success: true,
      error: {},
      data: movieDetails,
      msg: "Successfully fetched the movie details",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: {},
      msg: "Something went wrong from server while fetch the details of movie",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({
        msg: "No movieId found",
      });
    }
    const movie = await Movie.findByIdAndUpdate(movieId, req.body, {
      returnDocument: "after",
      runVlaidators: true,
    }); // suppose we have some validation in the schema field so if we wants to keep the validation even when we are updating we have to use runVlaidators:true
    if (!movie) {
      return res.status(400).json({
        msg: "No movie found",
      });
    }
    return res.status(200).json({
      success: true,
      error: {},
      data: movie,
      msg: "update movie successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: {},
      msg: "Something went wrong while update the movie details",
    });
  }
};

const getMovies = async (req, res) => {
  const movies = await Movie.find();
  return res.status(200).json({
    msg: "These are all the movies",
    data: movies,
  });
};

const getMovieByName = async (req, res) => {
  let query = {};
  if (req.query.name) {
    query.name = req.query.name;
  } else {
    return res.status(400).json({
      msg: "Give the movie name",
    });
  }
  const movie = await Movie.findOne(query);
  if (!movie) {
    return res.status(404).json({
      msg: "No movie found in the data base",
    });
  }
  return res.status(200).json({
    msg: "This is the movie",
    data: movie,
  });
};
export {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies,
  getMovieByName,
};
