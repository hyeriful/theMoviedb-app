import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
import { FAVORITE_SERVER } from "../../../Config";

function Favorite(props) {
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [IsFavorite, setIsFavorite] = useState(false);

  let variables = {
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.get(`${FAVORITE_SERVER}/number/${movieId}`).then((res) => {
      if (res.data.success) {
        setFavoriteNumber(res.data.favoriteNumber);
      } else {
        console.log("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.get(`${FAVORITE_SERVER}/check/${movieId}`).then((res) => {
      if (res.data.success) {
        setIsFavorite(res.data.isFavorite);
      } else {
        console.log("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (IsFavorite) {
      Axios.delete(`${FAVORITE_SERVER}/removeFromFavorite/${movieId}`).then(
        (res) => {
          if (res.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setIsFavorite(!IsFavorite);
          } else {
            alert("Favorete 리스트에서 지우는 것을 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post(`${FAVORITE_SERVER}/addToFavorite`, variables).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setIsFavorite(!IsFavorite);
        } else if (!res.data.isAuth) {
          alert("로그인이 필요합니다.");
        } else {
          alert("Favorete 리스트에 추가하는 것을 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {IsFavorite ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
