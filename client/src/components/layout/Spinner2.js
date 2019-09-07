import React, { Fragment } from "react";
import spinner from "./Ellipsis-1s-200px.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='Loading...'
        style={{ width: "100%", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
