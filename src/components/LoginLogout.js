/** @format */

import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Container, Paper } from "@mui/material";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";

export default function LoginLogout() {
  const [authMode, setauthMode] = useState("login");
  const switchMode = () => {
    if (authMode === "login") {
      setauthMode("signup");
    } else {
      setauthMode("login");
    }
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Paper elevation={20}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <h2>Login</h2>
          <Switch onClick={switchMode} />
          <h2>SignUp</h2>
        </div>
        {authMode === "login" && <SignIn />}
        {authMode === "signup" && <SignUp />}
      </Paper>
    </Container>
  );
}
