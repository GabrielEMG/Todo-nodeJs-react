import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import { UserProvider } from "./hooks/userContext";

const App = () => {
  return (
    <div className="container bg-light p-4 mt-2">
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
