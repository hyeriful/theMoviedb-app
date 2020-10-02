import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Typography, Popover } from "antd";
import { FAVORITE_SERVER, IMAGE_BASE_URL } from "../../Config";
import "./FavoritePage.css";

const { Title } = Typography;

function FavoritePage() {
  const [FavoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = () => {
    Axios.get(`${FAVORITE_SERVER}/getFavoriteMovie`).then((res) => {
      if (res.data.success) {
        setFavoriteList(res.data.favorites);
      } else {
        alert("좋아하는 영화 목록을 가져오는데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId) => {
    Axios.delete(`${FAVORITE_SERVER}/removeFromFavorite/${movieId}`).then(
      (res) => {
        if (res.data.success) {
          fetchFavoriteMovies();
        } else {
          alert("리스트에서 지우는데 실패했습니다.");
        }
      }
    );
  };

  const renderLists = FavoriteList.map((fav, index) => {
    const hoverContent = (
      <div>
        {fav.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${fav.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={hoverContent} title={`${fav.movieTitle}`}>
          <td>{fav.movieTitle}</td>
        </Popover>
        <td>{fav.movieRunTime} mins</td>
        <td>
          <button onClick={() => onClickDelete(fav.movieId)}>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="app" style={{ height: "100vh" }}>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Title level={3} style={{ fontWeight: "500" }}>
          Favorite Movies
        </Title>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <td>Remove from favorites</td>
            </tr>
          </thead>
          <tbody>{renderLists}</tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoritePage;
