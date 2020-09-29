import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { loginUser } from "../../../_actions/user_action";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();

  //react hook 사용
  //[현재 상태, Setter함수]
  const [Email, setEmail] = useState(""); //초기값 빈 문자열로 세팅
  const [Password, setPassword] = useState("");

  //타이핑을 할 때 onChange라는 이벤를 발생시켜서 state를 바꿔준다 -> state이 바뀌면 value가 바뀐다
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //이걸 안해주면 버튼 누를때마다 페이지가 refresh 되어서 밑에 쭉 해야할 일을 하지 못하고(페이지가 refresh)

    let body = {
      email: Email,
      password: Password,
    };

    // dispatch를 이용해서 action을 취한다
    // dispatch를 통해서 action으로 가면 action에서 할일을 한 후에 combineReducers로 설정해 준 부분으로 가서 type에 따라서 case 조건문에서 걸러져서 return 값을 내는 형태
    dispatch(loginUser(body)) //dispatch(action이름)
      .then((response) => {
        if (response.payload.loginSuccess) {
          props.history.push("/"); // 리액트에서 페이지 이동 시키는 방법
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div
      className="app"
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Title level={2} style={{ fontWeight: "100" }}>
        Log In
      </Title>
      <form
        sytle={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <Form.Item required>
          <Input
            id="email"
            size="large"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your email"
            type="email"
            value={Email}
            onChange={onEmailHandler}
          />
        </Form.Item>
        <Form.Item required>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ minWidth: "100%" }}
          onSubmit={onSubmitHandler}
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
