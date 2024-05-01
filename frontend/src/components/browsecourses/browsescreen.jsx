import { Grid, Skeleton } from "@mui/material";
import { useState } from "react";
import Header from "./header.jsx";
import Browse from "./browse.jsx";

function Browserscreen() {
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
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100vh"}
            style={{ backgroundColor: "green" }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Browserscreen;
