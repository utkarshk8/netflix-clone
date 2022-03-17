import React, { useEffect, useState } from "react";
import instance from "../API/axios";
import requests from "../API/request";
import "../components/Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    };
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "top",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h3 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h3>
        </div>
        <div className="banner_fadebottom"></div>
      </header>
    </>
  );
};
export default Banner;
