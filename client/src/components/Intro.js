import React from "react";
import Paper from "@material-ui/core/Paper";

import "../style/style.css";
import CardImage from "../images/img1v5.png";

const text1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies purus lectus, at luctus massa scelerisque nec. Sed ac urna magna. Nam vestibulum, tortor ac hendrerit viverra, est orci vulputate risus, vitae sodales massa.";

const Intro = () => {
  return (
    <div>
      <Paper
        style={{
          borderRadius: "35px",
          padding: "25px",
          background: "#FFA800"
        }}
      >
        <h1 className='thinRobotoFont centerFont' style={{ color: "white" }}>
          Who's Dabler?
        </h1>
        <img src={CardImage} style={{ width: "100%", height: "auto" }} alt='' />
        <Paper
          style={{
            background: "black",
            borderRadius: "20px",
            padding: "25px",
            margin: "25px"
          }}
        >
          <h2 className='thinRobotoFont centerFont' style={{ color: "white" }}>
            {text1}
          </h2>
        </Paper>

        <p className='lightRobotoFont centerFont' style={{ color: "black" }}>
          Music is a universal language
        </p>
      </Paper>
    </div>
  );
};

export default Intro;
