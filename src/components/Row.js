import React, { useEffect, useState } from "react";
import instance from "../API/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseurl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchURL);

      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [trailerUrl, setTrailerUrl] = useState("");

  const onClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="row">
      <h1 className="title">{title}</h1>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              key={movie.id}
              src={`${baseurl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => {
                onClick(movie);
              }}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
export default Row;
