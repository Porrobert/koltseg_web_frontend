import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Kiadas from "./sajatosztalyok/Kiadas"
import Rendszerezes from "./sajatosztalyok/Rendszerezes"
import Torles_kiadas from "./sajatosztalyok/Torles_kiadas"
import Torles_koltsegfajta from "./sajatosztalyok/Torles_koltsegfajta"
import Nevjegy from "./sajatosztalyok/Nevjegy"
import Beveteltorles from "./sajatosztalyok/Beveteltorles"
import Fajtatorles from "./sajatosztalyok/Fajtatorles"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/Nevjegy">
        
        Költségvetés kezdőlap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <div className="navbar-nav mr-auto">
            

            <li className="nav-item">
              <Link to={"/Kiadas"} className="nav-link">
                Kiadás
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Rendszerezes"} className="nav-link">
                Rendszerezés
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Beveteltorles"} className="nav-link">
                Bevétel törlés
              </Link>
            </li>

{/*-----------------------------------------------Admin menüpont */}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_kiadas"} className="nav-link">
                  Admin Törlés
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_koltsegfajta"} className="nav-link">
                  Admin Törlés 2
                </Link>
              </li>
            )}


            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Fajtatorles"} className="nav-link">
                  Fajta törlés
                </Link>
              </li>
            )}

            
          </div>
          
          
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Kiadas" component={Kiadas} />
            <Route path="/Rendszerezes" component={Rendszerezes} />
            <Route path="/Torles_kiadas" component={Torles_kiadas} />
            <Route path="/Torles_koltsegfajta" component={Torles_koltsegfajta} />
            <Route path="/Nevjegy" component={Nevjegy} />
            <Route path="/Beveteltorles" component={Beveteltorles} />
            <Route path="/Fajtatorles" component={Fajtatorles} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
