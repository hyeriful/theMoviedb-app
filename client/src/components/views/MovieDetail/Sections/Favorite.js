import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { FAVORITE_SERVER } from "../../../Config";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  useEffect(() => {
    axios.get(`${FAVORITE_SERVER}/number/${movieId}`).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        console.log("숫자 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <Button>Favorite</Button>
    </div>
  );
}

export default Favorite;
