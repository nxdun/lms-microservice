//this comp filters the courses based on the user's choice and displays them
//as header tabs

import { Grid } from "@mui/material";
import { useState } from "react";
import Header from "./header.jsx";
import Browse from "./browse.jsx";
import MyCourses from "./mycourses.jsx";

function Browserscreen() {
  //TODO: change useState 0 to show browse courses at start
  const [value, setValue] = useState(0); // Initially, show the LandingBody component

  const logsOut = () => {
    window.location.href = "/logout";
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header value={value} setValue={setValue} logsOut={logsOut} />
      </Grid>
      <Grid item xs={12}>
        {value === 0 ? (
          <Browse/>
        ) : (
          <MyCourses/>
        )}
      </Grid>
    </Grid>
  );
}

export default Browserscreen;
