import React from "react";
import { Switch, Route } from "react-router-dom";

import TopNav from "./TopNav/TopNav";
import SideBar from "./SideBar/SideBar";
import Advert from './Advert/Advert'

import Home from "../Pages/Home/Home";
// import Profile from "../Pages/Profile";
import Profile2 from "../Pages/Profile2";
import Project from "../Pages/Project";
import Library from "../Pages/Library";
import Discussions from "../Pages/Discussion";
import Payment from "../Pages/Payment";

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <SideBar />
        <Advert />
        <main className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Route path="/profile/:friend" component={Profile2} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/discuss" component={Discussions} />
            <Route exact path="/payment" component={Payment} />
          </Switch>
        </main>

      </React.Fragment>
    );
  }
}

export default Main;
