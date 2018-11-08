import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import privateRoutes from "../../routes/private.js";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import Auth from "../../services/auth.js";

class App extends React.Component {
  render() {
    if (!Auth.isLoggedIn()) {
      return (<Redirect to="/login" />);
    }

    return (
      <div>
        <div>
          <Header />
          <div>
            <Switch>
              {privateRoutes.map((prop, key) => {
                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                return <Route path={prop.path} component={prop.component} key={key} />;
              })}
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
