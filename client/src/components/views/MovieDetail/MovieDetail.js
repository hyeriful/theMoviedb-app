import React, { useEffect, useState } from "react";
import { Button, Row } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState({});
  const [Casts, setCasts] = useState([]);
  const [AcotrToggle, setAcotrToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });

    fetch(endpointCrew)
      .then((res) => res.json())
      .then((res) => setCasts(res.cast));
  }, []);

  const ToggleActorView = () => {
    setAcotrToggle(!AcotrToggle);
  };

  return (
    <div className="app">
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      <div className="movie_info" style={{ width: "85%", margin: "1rem auto" }}>
        <MovieInfo movie={Movie} />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <Button onClick={ToggleActorView}>Toggle Actor View</Button>
        </div>

        {AcotrToggle && ( //AcotrToggle이 true일 경우에만 실행
          <Row gutter={[30, 30]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
