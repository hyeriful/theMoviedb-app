import React, { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [MainMovie, setMainMovie] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.results); //20개의 movies가 담긴 배열
        setMovies([...Movies, ...res.results]);
        // setMovies(res.results);
        if (CurrentPage == 0) setMainMovie(res.results[0]);
        setCurrentPage(res.page);
      });
  };

  const loadMoreItemsHandler = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div className="app">
      <div className="mainImage">
        {MainMovie && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovie.backdrop_path}`}
            title={MainMovie.original_title}
            text={MainMovie.overview}
          />
        )}
      </div>

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* Movie Grid Cards */}
        <Row gutter={[30, 30]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button onClick={loadMoreItemsHandler}>LoadMore</Button>
      </div>
    </div>
  );
}

export default LandingPage;
