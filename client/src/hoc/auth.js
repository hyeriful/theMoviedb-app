import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

// HOC is a function that takes a component and returns a new componenet
export default function (SpecificComponent, option, adminRoute = null) {
  // option
  // null  =>  아무나 출입이 가능한 페이지
  // true  =>  로그인한 유저만 출입이 가능한 페이지
  // false =>  로그인한 유저는 출입 불가능한 페이지 (회원가입, 로그인 등)

  // HOC(higher order component)에서 backend에 request를 보내고, HOC안에 있는 페이지에 들어와있는 사람의 상태정보를 HOC에 가져온다
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user); //리덕스 스토어의 상태 조회
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
