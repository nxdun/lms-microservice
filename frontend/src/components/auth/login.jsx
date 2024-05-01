import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DynamicBackdrop from "src/components/common/backdrop";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,
    background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background color
    backdropFilter: "blur(30px)", // Apply background blur
    WebkitBackdropFilter: "blur(30px)", // Webkit version for Safari
    boxShadow: "none", // Remove box shadow to maintain the glass effect,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const onSignUp = async () => {
  };


  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
      <DynamicBackdrop open={false} />
    </Grid>
  );
};

export default Login;
