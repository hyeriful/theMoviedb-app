import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

function RegisterPage(props) {
  const dispatch = useDispatch();

  //react hook 사용
  const [Email, setEmail] = useState(""); //초기값 빈 문자열로 세팅
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    // redux를 사용하지 않는다연
    // Axios.post('/api/users/register', body)

    // dispatch를 이용해서 action을 취한다
    dispatch(registerUser(body)) //dispatch(action이름)
      .then((response) => {
        if (response.payload.success) {
          props.history.push("/login"); // 리액트에서 페이지 이동 시키는 방법
        } else {
          alert("Failed to sign up");
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
        Sign Up
      </Title>
      <form
        sytle={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <Form.Item required>
          <Input
            id="email"
            size="large"
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="email"
            type="email"
            value={Email}
            onChange={onEmailHandler}
          />
        </Form.Item>

        <Form.Item required>
          <Input
            id="name"
            size="large"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="name"
            type="name"
            value={Name}
            onChange={onNameHandler}
          />
        </Form.Item>

        <Form.Item required>
          <Input.Password
            id="password"
            size="large"
            placeholder="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>

        <Form.Item required>
          <Input.Password
            size="large"
            placeholder="confirm password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
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

export default withRouter(RegisterPage);
