import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
// import Home from './Pages/Home/Home'
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import RegRoute from "./components/routes/RegRoute";
import RegMessage from "./components/messages/Message";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import ContReg from "./Pages/contReg/ContReg";
import ContReg2 from "./Pages/contReg/ContReg2";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Main from "./components/Main";
import ContReg3 from "./Pages/contReg/ContReg3";
import ContReg4 from "./Pages/contReg/ContReg4";
import ContReg5 from "./Pages/contReg/ContReg5";
import ContReg6 from "./Pages/contReg/ContReg6";
import Payment from "./Pages/Payment";
import EventPage from "./Pages/EventPage";
import Profile from "./Pages/Profile";
import Confirmation from "./components/messages/Message2";
import OldMembers from "./Pages/Old/Old";
import OldMembers2 from "./Pages/Old/Old2";
import OldmembersPage from "./Pages/OldMembers/OldmembersPage";
import Confirm from "./components/messages/Confirm";
import Reject from "./components/messages/Reject";
import ContReg7 from "./Pages/contReg/ContReg7";

const App = ({ location }) => (
  <div>
    <Switch>
      <Route location={location} path="/" exact component={LandingPage} />

      <RegRoute exact path="/cont" component={ContReg} />
      <RegRoute exact path="/cont2" component={ContReg2} />
      <GuestRoute exact path="/old" component={OldMembers} />
      <GuestRoute exact path="/old2" component={OldMembers2} />
      <RegRoute exact path="/cont3" component={ContReg3} />
      <RegRoute exact path="/cont4" component={ContReg4} />
      <RegRoute exact path="/cont5" component={ContReg5} />
      <RegRoute exact path="/cont6" component={ContReg7} />
      <RegRoute exact path="/cont7" component={ContReg6} />
      <RegRoute exact path="/confirmation" component={Confirmation} />
      <Route exact path="/regmessage" component={RegMessage} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/events" component={EventPage} />
      <Route exact path="/confirm/:id/:user" component={Confirm} />
      <Route exact path="/reject/:id/:refereeId" component={Reject} />
      {/* <Route location={location} path='/login' exact component={LoginPage} /> */}
      <Route location={location} path="/signup" exact component={SignUpPage} />
      <Route
        location={location}
        path="/forgotpassword"
        exact
        component={ForgotPassword}
      />
      <Route location={location} path="/login" exact component={LoginPage} />
      <Route
        location={location}
        path="/onboard/:id"
        exact
        component={OldmembersPage}
      />
      <UserRoute location={location} path="/app" component={Main} />
    </Switch>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
