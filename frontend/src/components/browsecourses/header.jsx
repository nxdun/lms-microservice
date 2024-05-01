import {
    AppBar,
    Button,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  
  import "src/styles/index.css";
  import propsval from "prop-types";
  
  const Header = ( {value, setValue, logsOut} ) => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  
    return (
      <AppBar
        sx={{
          background: "rgba(234, 234, 234, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "none",
          position: "absolute",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Toolbar>
  
          {isMatch ? (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Browse" />
                <Tab label="Collections" />
              </Tabs>
            </>
          ) : (
            <>
              <Typography
                sx={{ fontSize: "2rem", paddingLeft: "10%", color: "grey" }}
              >
  
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Browse" />
                <Tab label="Collections" />
              </Tabs>
              <Button
                sx={{
                  marginLeft: "auto",
                  background: "rgba(255, 46, 99, 0.3)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "none",
                  zIndex: 1,
                }}
                variant="contained"
                onClick={logsOut}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;

  Header.propTypes = {
    value: propsval.number.isRequired,
    setValue: propsval.func.isRequired,
    logsOut: propsval.func.isRequired,
  };
  

  