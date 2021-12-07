import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "animate.css";
import Home from "./pages/Home/index.js";
import SignIn from "./components/LogIn/SignIn.jsx";
import { SnackbarProvider } from "notistack";
const GlobalStyle = createGlobalStyle`
* {
  padding: 0
}

a {
  text-decoration: none;
}

body {
padding: 0;
margin: 0;
background: #F5F7FA;
}
`;

function App() {
  const Auth = localStorage.getItem("token");
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          {!Auth ? (
            <>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Redirect from="/" to="/signin" />
            </>
          ) : (
            <>
              <Route exact path="/home">
                <Home />
              </Route>
              <Redirect from="/" to="/home" />
            </>
          )}

          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route>404 Not Found</Route>
        </Switch>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
