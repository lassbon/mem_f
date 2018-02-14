import React from "react";
import { Advertisement } from "semantic-ui-react";
import "./Advert.css";

const Advert = () => (
  <div style={{ marginLeft: "75vw" }}>
    <Advertisement
      className="add_name"
      unit="medium rectangle"
      test="Medium Rectangle"
    />
    <Advertisement
      className="add_name2"
      unit="medium rectangle"
      test="Medium Rectangle"
    />
  </div>
);

export default Advert;
