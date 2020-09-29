import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import MovieDetail from "./views/MovieDetail/MovieDetail";
import Footer from "./views/Footer/Footer";
import NavBar from "./views/NavBar/NavBar";
import Auth from "../hoc/auth"; //hoc안에 다른 컴포넌트를 넣어주는 방법

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
