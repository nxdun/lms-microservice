import { useState } from "react";

//import MUI components for building the registration form
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DynamicBackdrop from 'src/components/common/backdrop'; // Import the backdrop component

//functional component for the registration page
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //styling for paper, avatar, and buttons
  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,

  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //function to handle registration
  const handleRegister = async () => {
    setLoading(true);
  };

  //function to handle form submission and registration
  const onSignUp = (e) => {
    e.preventDefault();
    handleRegister();

  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <HowToRegOutlinedIcon />
          </Avatar>
          <h2>Learner Register</h2>
        </Grid>
        <form onSubmit={onSignUp}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography>
          {" "}
          Want to Login ? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
      <DynamicBackdrop open={loading} />
    </Grid>
  );
};

export default Register;
