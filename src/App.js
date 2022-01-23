import React from "react"
import Navbar from "./components/Navbar";
import {Route, Router, Switch} from "react-router-dom";
import Home from "./pages/Home";
import AppLoader from "./hoc/AppLoader";
import ProtectedRoute from "./components/ProtectedRoutes";
import UserPage from "./pages/UserPage";
import history from "./utils/history";
import TaskPage from "./pages/TaskPage";
import TimeSheets from "./pages/Timesheets";

function App() {

  return (
      <AppLoader>
        <div className="app">
            <Router history={history}>
                <Navbar/>
                <div className="container pb-2">
                    <Switch>
                        <ProtectedRoute exact  path='/timesheets' component={TimeSheets} />
                        <ProtectedRoute exact path='/tasks' component={TaskPage} />
                        <ProtectedRoute exact path='/:id' component={UserPage} />
                        <Route  path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        </div>
      </AppLoader>
  );
}

export default App;
