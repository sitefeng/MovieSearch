
export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIES_DONE = "GET_MOVIES_DONE";
export const GET_MOVIES_FAIL = "GET_MOVIES_FAIL";

export const CLEAR_MOVIES = "CLEAR_MOVIES";

export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const GET_MOVIE_DETAILS_DONE = "GET_MOVIES_DETAILS_DONE";
export const GET_MOVIE_DETAILS_FAIL = "GET_MOVIES_DETAILS_FAIL";

const initialState = {
  movies: [],
  selectedMovie: {},
  loading: false,
  error: null
}

export const databaseURL = "https://api.themoviedb.org/3";
export const imageBaseURL = "https://image.tmdb.org/t/p/w500/"
const tmdbApiKey = "7205dd204cb58ea69bc96e0d46c5c774";

export default function MovieReducer(state=initialState, action) {
  switch(action.type) {
    case GET_MOVIES:
      return {
        ...state,
        loading: true,
        error: false
      }
    case GET_MOVIES_DONE:
      return {
        ...state,
        movies: action.movies,
        loading: false,
        error: false
      }
    case GET_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Get movies failed'
      }
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      }
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        selectedMovie: {},
        loading: true,
        error: false
      }
    case GET_MOVIE_DETAILS_DONE:
      return {
        ...state,
        selectedMovie: action.movie,
        loading: false,
        error: false
      }
    case GET_MOVIE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Get movie details failed'
      }
    default:
      return state
  }

}


// Actions Creators
export function getMovies() {
  return {
    type: GET_MOVIES
  }
}

export function getMoviesDone(movies) {
  return {
    type: GET_MOVIES_DONE,
    movies: movies
  }
}

export function getMoviesFail() {
  return {
    type: GET_MOVIES_FAIL
  }
}

export function clearMovies() {
  return {
    type: CLEAR_MOVIES
  }
}


export function getMovieDetails() {
  return {
    type: GET_MOVIE_DETAILS
  }
}

export function getMovieDetailsDone(movie) {
  return {
    type: GET_MOVIE_DETAILS_DONE,
    movie: movie
  }
}

export function getMovieDetailsFail() {
  return {
    type: GET_MOVIE_DETAILS_FAIL
  }
}

export function fetchMovies(dispatch, searchText) {
  dispatch(getMovies());
  const searchUrl = databaseURL + `/search/movie?api_key=${tmdbApiKey}&query=` + encodeURIComponent(searchText);

  return fetch(searchUrl).then((resp)=>{
      if (!resp.ok) {
        console.log("databaseURL error")
        throw Error(resp.statusText)
      }
      return resp
    }).then(resp => {
      return resp.json()
    }).then(data => {
      const movies = data.results
      dispatch(getMoviesDone(movies))
      return data
    }).catch(error => {
      dispatch(getMoviesFail())
    })

}

export function fetchMovieDetails(dispatch, id) {
  dispatch(getMovieDetails());
  const searchUrl = databaseURL + `/movie/${id}?api_key=${tmdbApiKey}`;

  return fetch(searchUrl).then((resp)=>{
      if (!resp.ok) {
        console.log("databaseURL error")
        throw Error(resp.statusText)
      }
      return resp
    }).then(resp => {
      return resp.json()
    }).then(data => {
      const movie = data;
      dispatch(getMovieDetailsDone(movie));
      return data
    }).catch(error => {
      dispatch(getMovieDetailsFail());
    })
}
