import React from "react"
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Navbar/>
            <div className="container pb-2">
                <Switch>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
