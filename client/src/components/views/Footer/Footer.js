import React from "react";
import { SmileOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        height: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        The Movie App by Hyeri Lee <SmileOutlined />
      </p>
    </div>
  );
}

export default Footer;
