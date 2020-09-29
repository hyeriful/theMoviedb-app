import React from "react";
import { Menu } from "antd";
const Logo = require("../../../../assets/images/Logo.png");

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "100px", height: "30px" }}
          />
        </a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
