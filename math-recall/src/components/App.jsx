import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./navbar";
import HomeScreen from "./home";
import FormulaList from "./list";
import NewFormulaForm from "./newformula";
import Calculator from "./calculator";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/calculate/:id" component={Calculator} />
          <Route
            path="/create"
            render={({ history }) => <NewFormulaForm history={history} />}
          />
          <Route path="/list">
            <FormulaList />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
