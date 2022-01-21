import React, {useEffect} from "react"
import Navbar from "./components/Navbar";
import {Route, Router, Switch} from "react-router-dom";
import Home from "./pages/Home";
import {useDispatch} from "react-redux";
import {loadUsers} from "./store/users";
import AppLoader from "./hoc/AppLoader";
import ProtectedRoute from "./components/ProtectedRoutes";
import UserPage from "./pages/UserPage";
import Logout from "./components/Logout";
import history from "./utils/history";

function App() {

  return (
      <AppLoader>
        <div className="app">
            <Router history={history}>
                <Navbar/>
                <div className="container pb-2">
                    <Switch>
                        <Route path='/logout' component={Logout} />
                        <ProtectedRoute path='/:id' component={UserPage} />
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </Router>
        </div>
      </AppLoader>
  );
}

export default App;
