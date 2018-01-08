import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from '../Pages/Profile'
import Profile2 from '../Pages/Profile2';

const ProfileLike = () => (
  <Switch>
    <Route exact path='/profile' component={Profile}/>
    <Route path='/profile/:name' component={Profile2}/>
  </Switch>
)


export default ProfileLike
