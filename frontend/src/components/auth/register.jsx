import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import * as yup from "yup"; // Import yup for validation

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
import Swal from "sweetalert2"; 

import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import DynamicBackdrop from 'src/components/common/backdrop'; // Import the backdrop component
import ReCAPTCHA from "react-google-recaptcha";
// Define Yup schema for validation
const userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

//functional component for the registration page
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors
  const [captcha, setCaptcha] = useState("");


  //styling for paper, avatar, and buttons
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //function to handle registration
  const handleRegister = async () => {
    try {
      console.log("captcha validated. : ", captcha);
      setLoading(true);
      // Validate input using Yup schema
      await userSchema.validate({ firstName, lastName, email, password }, { abortEarly: false });
      
      // Make a POST request to your backend API endpoint for user registration
      await axios.post("http://localhost:5000/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      // Registration successful, you may redirect the user to login or show a success message
      let timerInterval;
      Swal.fire({
        title: "Registration successful!",
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
            ".Swal2-timer-progress-bar"
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
          window.location.href = "/login/learner";
        }
      });
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please check the form for errors",
        });

        setValidationErrors(error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {}));
      } else {  
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: "A Network error occurred while registering the user",
        });
        console.error("Error registering user:", error);
      }
      setLoading(false);
    }
  };

  //function to handle form submission and registration
  const onSignUp = (e) => {
    e.preventDefault();
    handleRegister();
  };

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
            label="First Name"
            placeholder="Enter first name"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!validationErrors.firstName}
            helperText={validationErrors.firstName}
          />
          <TextField
            label="Last Name"
            placeholder="Enter last name"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!validationErrors.lastName}
            helperText={validationErrors.lastName}
          />
          <TextField
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
           <ReCAPTCHA
            sitekey="6Leg6dgpAAAAAOHOV9pQsn14p_G09lqGUsuEKPW6"
            onChange={(token) => setCaptcha(token)}
            onExpired={() => setCaptcha("")}
            data-testid="recaptcha"
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
