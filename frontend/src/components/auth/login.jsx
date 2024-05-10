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
import DynamicBackdrop from "src/components/common/backdrop";
import { Logsin } from "src/services/authService";
import Swal from "sweetalert2";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const onSignUp = async () => {
    setLoading(true);
    event.preventDefault();
    //validate password have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    //valdate username at least 5 characters
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      );
      setLoading(false);
      return;
    }

    if (username.length < 5) {
      alert("email must contain at least 5 characters");
      setLoading(false);
      return;
    }

    const success = await Logsin(username, password);

    if (success) {
      //success alert
    let timerInterval;
    Swal.fire({
      title: "Login successful!",
      text: `Redirecting to user space`,
      icon: "success",
      showCancelButton: false,
      timer: 2000,
      timerProgressBar: true,
      confirmButtonColor: "#FF2E63",
      cancelButtonColor: "#08D9D6",
      didOpen: () => {
        Swal.showLoading();
        // Access the timer element within the Swal popup
        const timerElement = document.querySelector(
          ".swal2-timer-progress-bar"
        );
        timerInterval = setInterval(() => {
          if (timerElement) {
            timerElement.style.width = `${Swal.getTimerLeft()}%`;
          }
        }, 400);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = "/browse";
      }
    });
    setLoading(false);
  }else{
    setLoading(false);
  }
}
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <img src="src/assets/learner.svg"></img>
          </Avatar>
          <h2>Learner log in</h2>
        </Grid>
        <form onSubmit={onSignUp}>
          <TextField
            label="email"
            placeholder="Enter email"
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
      <DynamicBackdrop open={loading} />
    </Grid>
  );
};

export default Login;
