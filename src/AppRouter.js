import { Box, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import SignUp from "./SignUp";

function CopyRight() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ alignItems: "flex-end" }}
    >
      {"Copyright  © "}
      castlehyeon, {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default class AppRouter extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<App />} />
            </Routes>
          </div>
          <Box mt={5}>
            <CopyRight />
          </Box>
        </Router>
      </div>
    );
  }
}
