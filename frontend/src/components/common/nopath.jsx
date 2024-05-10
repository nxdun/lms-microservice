import { Paper, Typography } from "@mui/material";

//functional component to render error message fro invalid paths
const ErrorPath = () => {
  //check if token exists in local storage
  const hasToken = localStorage.getItem("username");

  return (
    <Paper
      sx={{
        backgroundColor: "#000", // Black background
        padding: "20px",
        color: "#fff", // White text
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto", // Center horizontally
        position: "fixed",
        top: "50%", // Center vertically
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Error!! invalid path <br/><br/><br/> {hasToken ? `${localStorage.getItem("username")} !! You are already logged in` : "Not a valid path."}
      </Typography>
      <Typography>
        Possible routes 
        <br />
        <a href="/login">Login</a>
        <br />
        <a href="/register">Register</a>
        {hasToken && <span><br/><a href="/userspace">User Space</a></span>}
      </Typography>
    </Paper>
  );
};

export default ErrorPath;
