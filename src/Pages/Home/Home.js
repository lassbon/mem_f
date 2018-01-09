import React from "react";
import { Button, Message} from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes, { shape } from 'prop-types';

import Post from "../../components/Post/Post";
import { allPostSelctor } from "../../reducer/posts";
import TopNav from "../../components/TopNav/TopNav";
import SideBar from "../../components/SideBar/SideBar";
import Advert from "../../components/Advert/Advert";

const Home = ({posts}) => (
  <React.Fragment>
      <Post />
  </React.Fragment>
)

Home.propTypes = {
  posts: PropTypes.arrayOf(
    shape({
      mainPost: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

function mapStateToProps(state) {
  return {
    posts: allPostSelctor(state)
  }
}

export default connect(mapStateToProps)(Home)