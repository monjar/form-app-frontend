import React from "react";
import FormsList from "./Pages/FormsList";
import FormPage from "./Pages/FormPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={FormsList} />
          <Route exact path="/:formId" component={FormPage} />

          {/* <Route exact path="/">
              <FormsList />
              <button style={{ height: "100px", width: "100px" }}></button>
            </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
